import Navbar from '@/components/Navbar'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from 'react'
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
import { BACKEND_URL } from '@/config/config'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from '@/components/ui/textarea'
import { useNavigate } from 'react-router-dom'


export default function CreateTest() {

    const [date, setDate] = React.useState<Date>();
    const [edate, setEdate] = React.useState<Date>();
    const [duration, setDuration] = React.useState<Date>();
    const [name, setName] = React.useState<string>();
    const [tests, setTests] = React.useState([]);

    const [question, setQuestion] = React.useState<string>("");
    const [option1, setOption1] = React.useState<string>("");
    const [option2, setOption2] = React.useState<string>("");
    const [option3, setOption3] = React.useState<string>("");
    const [option4, setOption4] = React.useState<string>("");
    const [correctOption, setCorrectOption] = React.useState<string>("");

    const navigate = useNavigate();

    /**
     * carry over the current time when a user clicks a new day
     * instead of resetting to 00:00
     */
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

    const handleSubmit = async () => {

        try {

            const userData = {
                name: name,
                start_time: date,
                end_time: edate,
                duration: convertDateToSeconds(duration)
            }

            const res = await fetch(`${BACKEND_URL}/api/v1/test/createTest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })

            const data = await res.json()

            console.log(data)

        }
        catch (err) {
            console.log(err)
        }

    }

    // get all tests
    const getTests = async () => {

        try {

            const res = await fetch(`${BACKEND_URL}/api/v1/test/getTest`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()

            console.log(data)

            setTests(data.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        getTests()
    }, [])

    const handleAddQuestion = async (test_id: string) => {
        try {
            const questionData = {
                test_id: test_id,
                question: question,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correct_option: correctOption
            }

            const res = await fetch(`${BACKEND_URL}/api/v1/question/createquestion`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(questionData),
            })

            const data = await res.json()

            console.log(data)
            // Optionally, you can refresh the list of tests to include the new question
            getTests();
        }
        catch (err) {
            console.log(err)
        }
    }

    // handle delete of the test

    const handleDelete = async (id: string) => {

        try {

            const res = await fetch(`${BACKEND_URL}/api/v1/test/deleteTest`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })
    
            console.log(res)
            
        } catch (error) {

            console.log(error)
            
        }

        getTests()

    }

    const convertDateToSeconds = (date) => {
        if (!date) return 0;
    
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        return hours * 3600 + minutes * 60 + seconds;
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Navbar />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-screen mx-12 my-6">
                    <div className="flex items-center gap-4">
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Test
                        </h1>
                        <div className="items-center gap-2 md:ml-auto md:flex">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Add Test</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create Test</DialogTitle>
                                        <DialogDescription>
                                            Add information for test. Click add when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                className="col-span-3"
                                                placeholder='e.g. "Frontend Developer Test"'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
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
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
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
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Duration
                                            </Label>
                                            <TimePickerDemo setDate={setDuration} date={duration} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleSubmit}>Add Test</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    {tests.length === 0 ? (
                        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    You have no tests
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Create test and send to applicants.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-1 border-inherit shadow-sm bg-white" x-chunk="dashboard-02-chunk-1">
                            <Table>
                                <TableCaption className='mb-4'>A list of your Tests.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Test Name</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Start Time</TableHead>
                                        <TableHead>End Time</TableHead>
                                        <TableHead>No. of Questions</TableHead>
                                        <TableHead>Edit Test</TableHead>
                                        <TableHead>Add Question</TableHead>
                                        <TableHead className="text-right">Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tests.map((test: any) => (
                                        <TableRow key={test._id} >
                                            <TableCell className="font-medium">{test.test_name}</TableCell>
                                            <TableCell>{format(new Date(test.start_time), "PPP")}</TableCell>
                                            <TableCell>{format(new Date(test.start_time), "HH:mm:ss")}</TableCell>
                                            <TableCell>{format(new Date(test.end_time), "HH:mm:ss")}</TableCell>
                                            <TableCell>{test.questionArray.length}</TableCell>
                                            <TableCell><Button variant='secondary' onClick={() => navigate(`/admin/editTest/${test._id}`)}><span className="material-symbols-outlined">
                                                edit
                                            </span></Button></TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button><span className="material-symbols-outlined">
                                                            add
                                                        </span></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[500px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Add Questions</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="name" className="text-right">
                                                                    Question
                                                                </Label>
                                                                <Textarea className="col-span-3" placeholder="Type your message here." onChange={(e) =>
                                                                    setQuestion(e.target.value)
                                                                } />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Option 1
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    placeholder='Enter option 1 here'
                                                                    className="col-span-3"
                                                                    onChange={(e) => setOption1(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Option 2
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    placeholder='Enter option 2 here'
                                                                    className="col-span-3"
                                                                    onChange={(e) => setOption2(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Option 3
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    placeholder='Enter option 3 here'
                                                                    className="col-span-3"
                                                                    onChange={(e) => setOption3(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Option 4
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    placeholder='Enter option 4 here'
                                                                    className="col-span-3"
                                                                    onChange={(e) => setOption4(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    Correct Option
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    placeholder='Enter correct option here'
                                                                    className="col-span-3"
                                                                    onChange={(e) => setCorrectOption(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button type="submit" onClick={() => handleAddQuestion(test._id)}>Add Question</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button variant='destructive' onClick={() => handleDelete(test._id)}><span className="material-symbols-outlined">
                                                    delete
                                                </span></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    )
                    }
                </main>
            </div>
        </>
    )
}
