"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import Navbar from "@/components/Navbar"

// Question schema
const questionSchema = z.object({
    question: z.string(),
    option1: z.string(),
    option2: z.string(),
    option3: z.string().optional(),
    option4: z.string().optional(),
    correctOption: z.number(),
})

// Define the type for question
type Question = z.infer<typeof questionSchema>

// Sample questions array
const questions: Question[] = [
    {
        question: "What is the capital of France?",
        option1: "Berlin",
        option2: "Madrid",
        option3: "Paris",
        option4: "Rome",
        correctOption: 3,
    },
    {
        question: "What is 2 + 2?",
        option1: "3",
        option2: "4",
        option3: "5",
        option4: "6",
        correctOption: 2,
    },
    // Add more questions as needed
]

const formSchema = z.object({
    answers: z.array(z.number()),
})

export default function Test() {
    const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(-1))

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answers: userAnswers,
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const handleClearAnswer = (index: number) => {
        const updatedAnswers = [...userAnswers]
        updatedAnswers[index] = -1
        setUserAnswers(updatedAnswers)
        form.setValue(`answers.${index}`, -1)
    }

    return (
        <div className="bg-muted/40 min-h-screen">
        <Navbar />
            <div className="flex flex-col items-center justify-center mt-10 p-4">
                <h1 className="text-3xl font-bold mb-6">Student Test</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6 bg-white p-6 rounded-md shadow-md">
                        {questions.map((question, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={`answers.${index}`}
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <FormLabel className="text-lg font-medium">{question.question}</FormLabel>
                                            <button
                                                type="button"
                                                className="text-blue-500 underline"
                                                onClick={() => handleClearAnswer(index)}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(value) => {
                                                    field.onChange(Number(value))
                                                    const updatedAnswers = [...userAnswers]
                                                    updatedAnswers[index] = Number(value)
                                                    setUserAnswers(updatedAnswers)
                                                }}
                                                value={field.value?.toString()}
                                                className="flex flex-col space-y-1"
                                            >
                                                {["option1", "option2", "option3", "option4"].map(
                                                    (option, idx) =>
                                                        question[option as keyof Question] && (
                                                            <FormItem
                                                                key={idx}
                                                                className="flex items-center space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <RadioGroupItem value={(idx + 1).toString()} />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {question[option as keyof Question]}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
