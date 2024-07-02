import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from './ui/button';
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_URL } from '@/config/config';
import { CODE_SNIPPETS } from '@/Constants/snippet';

interface CodeSnippets {
    [key: string]: string;
}

export default function CodeEditor() {

    const editorRef = useRef();

    const [value, setValue] = useState<string>("");
    const [language, setLanguage] = useState("javascript");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    }

    const runCode = async () => {

        // Run the code

        try {

            const res = await fetch(`${BACKEND_URL}/api/v1/code/runcode/${language}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: value, input: input }),
            });
            
            const data = await res.json();

            setOutput(data.run.output); // Assuming the response contains an "output" field
            
        } catch (error) {
            
            console.log(error);

        }

    }

    return (
        <div className='p-4'>
            <div className='mb-5 flex'>
                <Select value={language} onValueChange={(value) => {
                    setLanguage(value)
                    setValue((CODE_SNIPPETS as CodeSnippets)[value])
                }
                }>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Languages</SelectLabel>
                            <SelectItem value="javascript">javascript</SelectItem>
                            <SelectItem value="java">java</SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="python">python</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className='ml-auto' onClick={runCode}>Run</Button>
            </div>
            <div className='flex'>
                <Editor
                    height="75vh"
                    width="100%"
                    language={language}
                    theme='vs-dark' 
                    onMount={onMount}
                    value={value}
                    onChange={(value: any) => setValue(value)}
                    defaultValue={(CODE_SNIPPETS as CodeSnippets)[language]}
                    options={{
                        fontSize: 16,
                        minimap: {
                            enabled: false
                        },
                        contextmenu: false,
                    }}
                />
                <div className='ml-4 w-1/2 flex flex-col gap-4'>
                    <Textarea 
                        placeholder="Type your input here." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                    />
                    <Textarea 
                        placeholder="Output will be displayed here." 
                        value={output} 
                        readOnly 
                    />
                </div>
            </div>
        </div>
    )
}
