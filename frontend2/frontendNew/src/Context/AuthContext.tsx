import { BACKEND_URL } from "@/config/config";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
}

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const checkAuth = async () => {

        const res = await fetch(`${BACKEND_URL}/api/v1/user/auth-check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data)
            setIsLoggedIn(true)
        } else {
            setUser(null)
            setIsLoggedIn(false)
        }
    }



    useEffect(() => {
        // fetch user's cookie
        checkAuth()

    }, [isLoggedIn, user]);

    const login = () => {
        // send token to backend
        checkAuth()
    }    

    const signup = (name: string, email: string, password: string) => {
        // send token to backend
    }

    const logout = async () => {
        // clear cookie

        const res = await fetch(`${BACKEND_URL}/api/v1/user/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json()

        if (res.ok) {
            setUser(null)
            setIsLoggedIn(false)
        } else {
            console.log(data)
        }

    }

    const value = {
        isLoggedIn,
        user,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
