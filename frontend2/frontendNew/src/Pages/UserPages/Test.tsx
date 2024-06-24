"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"

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
import { useAuth } from "@/Context/AuthContext"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "@/config/config"

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

const formSchema = z.object({
    answers: z.array(z.number()),
})

export default function Test() {
    const { user } = useAuth()
    const { id } = useParams()

    const [questions, setQuestions] = useState<any>([])
    const [userAnswers, setUserAnswers] = useState<number[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            answers: userAnswers,
        },
    })

    const fetchQuestions = async () => {
        const res = await fetch(`${BACKEND_URL}/api/v1/test/getSingleTest/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })

        const data = await res.json()

        console.log(data)

        setQuestions(data.data.Questions)
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)

        const questionArray = data.answers.map((answer, index) => ({
            questionId: questions[index]._id,
            answer: answer,
        }))

        const requestBody = {
            student: user.user.id, // Adjust this according to your user object structure
            testid: id,
            question_array: questionArray,
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/v1/test/calculate_score`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            if (response.ok) {
                const result = await response.json()
                toast({
                    title: "Success",
                    description: result.message,
                })
            } else {
                const errorResult = await response.json()
                toast({
                    title: "Error",
                    description: errorResult.message,
                })
            }
        } catch (error) {
            console.error("Error calculating score:", error)
            toast({
                title: "Error",
                description: "An error occurred while calculating the score.",
            })
        }
    }

    const handleClearAnswer = (index: number) => {
        const updatedAnswers = [...userAnswers]
        updatedAnswers[index] = 0
        setUserAnswers(updatedAnswers)

        form.setValue("answers", updatedAnswers)
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
