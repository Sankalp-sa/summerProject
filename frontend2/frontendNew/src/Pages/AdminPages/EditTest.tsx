import Navbar from "@/components/Navbar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BACKEND_URL } from "@/config/config"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { TimePickerDemo } from '@/utils/time-picker-demo'
import { Button } from "@/components/ui/button"
export default function EditTest() {

    const [date, setDate] = useState<Date>();
    const [edate, setEdate] = useState<Date>();
    const [name, setName] = useState<string>();
    const [questionArray, setQuestionArray] = useState<string[]>([]);

    const { id } = useParams()

    const handleSelect = (newDay: Date | undefined) => {
        if (!newDay) return;
        if (!date) {
            setDate(newDay);
            return;
        }
        const diff = newDay.getTime() - date.getTime();
        const diffInDays = diff / (1000 * 60 * 60 * 24);
        const newDateFull = add(date, { days: Math.ceil(diffInDays) });
        setDate(newDateFull);
    };

    const handleEndSelect = (newDay: Date | undefined) => {
        if (!newDay) return;
        if (!date) {
            setDate(newDay);
            return;
        }
        const diff = newDay.getTime() - date.getTime();
        const diffInDays = diff / (1000 * 60 * 60 * 24);
        const newDateFull = add(date, { days: Math.ceil(diffInDays) });
        setEdate(newDateFull);
    };

    const getTestDetails = async () => {

        const response = await fetch(`${BACKEND_URL}/api/v1/test/getSingleTest/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        console.log(data)

        setDate(new Date(data.data.start_time))
        setEdate(new Date(data.data.end_time))
        setName(data.data.test_name)
        setQuestionArray(data.data.questionArray)

    }

    const getQuestionDetails = async () => {

        const response = await fetch(`${BACKEND_URL}/api/v1/question/viewquestion`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json()

        return data
    }

    useEffect(() => {

        getTestDetails()

    }, [])

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Navbar />
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 m-12" style={{ "padding": "1% 13%" }}>
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>Edit Test</CardTitle>
                            <CardDescription>
                                Change the below test details and click on save to update the test.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        defaultValue={name}
                                    />
                                </div>
                                <div className='grid grid-rows-1 grid-flow-col gap-4'>
                                    <div className="grid gap-3">
                                        <Label htmlFor="username">
                                            Start Time
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={(d: Date | undefined) => handleSelect(d)}
                                                    initialFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePickerDemo setDate={setDate} date={date} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="username">
                                            End Time
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !edate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {edate ? format(edate, "PPP HH:mm:ss") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={edate}
                                                    onSelect={(d: Date | undefined) => handleEndSelect(d)}
                                                    initialFocus
                                                />
                                                <div className="p-3 border-t border-border">
                                                    <TimePickerDemo setDate={setEdate} date={edate} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Questions</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
