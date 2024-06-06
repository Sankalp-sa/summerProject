import { User } from "../models/User.js"
import { Request, Response, NextFunction } from "express"
import { hash, compare } from "bcrypt"
import { createToken } from "../utils/tokenUtils.js"

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const users = await User.find()
        return res.status(200).json(users)
        
    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { name, email, username, password, gender, dob, father, mother, phone, Alt_phone, address, role } = req.body;


        // console.log(name, email, password, username)
        // check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(401).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await hash(password, 10)

        const user = new User({
            name,
            email,
            username,
            password: hashedPassword
        })

        await user.save()

        res.clearCookie("auth_token", {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true
        })

        const token = createToken(user._id.toString(), user.email);

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(201).json({
            message: "User created successfully",
            id: user._id.toString()
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        // check if password is correct
        const isValid = await compare(password, user.password);
        if(!isValid){
            return res.status(403).json({
                message: "Invalid password"
            })
        }

        res.clearCookie("auth_token", {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true
        })

        const token = createToken(user._id.toString(), user.email);

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })

        res.status(200).json({
            ok: true,
            message: "Login successful",
            id: user._id.toString(),
            token: token    
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            message: "Internal Server Error"
        })

    }

}

// check User 

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const user = await User.findById(req.body.user.id)

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        return res.status(200).json({
            ok: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {

    try {

        res.clearCookie("auth_token", {
            path: "/",
            domain: "localhost",
            signed: true,
            httpOnly: true
        })

        res.status(200).json({
            ok: true,
            message: "Logout successful"
        })
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}
