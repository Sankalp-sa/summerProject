import React, { useEffect, useMemo, useState } from 'react'
import { Bell, CircleUser, Menu, Search } from "lucide-react"
import { Link } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from '@/Context/AuthContext'
import { useSocket } from '@/Context/SocketContext'

export default function Navbar() {

    const { isLoggedIn, logout } = useAuth()

    const {socket} = useSocket()

    const [notification, setNotification] = useState<string[]>([])

    useEffect(() => {

        if (socket) {
            console.log('Socket connected:', socket);

            socket.on("receiveNotification", (data: string) => {
                console.log("notification Data "+ data)
                setNotification((notification) => ([...notification, data]))
            });

            // get the notification from a particular room 


            return () => {
                socket.off("receiveNotification");
            };
        }
    }, [socket])

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 bg-background border-b px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    to="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <img src='https://static.vecteezy.com/system/resources/previews/022/227/351/original/openai-chatgpt-logo-icon-free-png.png' width={100} height={100} />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    to="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    to="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Chat
                </Link>

            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            to="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <img src='https://static.vecteezy.com/system/resources/previews/022/227/351/original/openai-chatgpt-logo-icon-free-png.png' width={100} height={100} />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            to="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Chat
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                {isLoggedIn ? (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon">
                                    <Bell className="h-4 w-4" />
                                    <span className="sr-only">Toggle Notification</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Notification</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {notification.map((n: string, i: number) => (
                                    <DropdownMenuItem key={i}>{n}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                            <Link
                                to="/signin"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Sign Up
                            </Link>
                        </nav>
                    </>
                )}
            </div>
        </header>
    )
}
