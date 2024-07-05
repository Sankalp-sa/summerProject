import React, { useEffect, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from '@/components/CodeEditor'
import { useParams } from 'react-router-dom'
import { BACKEND_URL } from '@/config/config';
import { CODE_SNIPPETS } from '@/Constants/snippet';

export default function CodingQuestion() {

    const { id } = useParams();

    const [value, setValue] = useState<string>(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState("javascript");
    const [questionDetails, setQuestionDetails] = useState<any>({})

    const getQuestionDetails = async () => {

        // Fetch the question details using the id
        const res = await fetch(`${BACKEND_URL}/api/v1/codingQuestion/getQuestion/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        console.log(data)

        if (res.status === 200) {
            setQuestionDetails(data);
        } else {
            console.log(data.message);
        }

    }

    useEffect(() => {

        getQuestionDetails();

    }, []);

    const onSubmit = async () => {

        const res = await fetch(`${BACKEND_URL}/api/v1/codingQuestion/submit/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ language, code: value, questionId: id })
        })
    }

    return (
        <div>
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-screen rounded-lg border flex"
            >
                <ResizablePanel defaultSize={30}>
                    <div className="p-5">
                        <div className="flex flex-col gap-4">
                            <h1 className="text-2xl font-semibold">{questionDetails.title}</h1>
                            <p className="text-lg">{questionDetails.description}</p>
                            <p className="text-lg"><span className='font-semibold'>Difficulty:</span> {questionDetails.difficulty ? questionDetails.difficulty : "Not Mentioned"}</p>
                        </div>
                        {/* Show the test cases too / */}
                        <div className='flex flex-col gap-4 mt-4'>
                            <h1 className='text-xl font-semibold'>Examples :</h1>
                            <div className='flex flex-col gap-4'>
                                {questionDetails.testCases?.map((testCase: any, index: number) => (
                                    // use grid to show input and output 
                                    <div key={index} className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <h1 className='text-lg font-semibold'>Input</h1>
                                            <p>{testCase.input.split('\n').map((input: any) => {
                                                return <>{input}<br /></>
                                            })}</p>
                                        </div>
                                        <div>
                                            <h1 className='text-lg font-semibold'>Output</h1>
                                            <p>{testCase.output.split('\n').map((output: any) => {
                                                return <>{output}<br /></>
                                            })}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={70}>
                    <CodeEditor language={language} setLanguage={setLanguage} value={value} setValue={setValue} onSubmit={onSubmit} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
