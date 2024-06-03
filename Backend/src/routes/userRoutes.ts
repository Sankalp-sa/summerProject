import { Router } from "express";
import { checkUser, getAllUsers, userLogin, userLogout, userSignUp } from "../controllers/userControllers.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/verifyJWT.js";

const userRouter = Router()

userRouter.get("/",getAllUsers)

userRouter.post("/signup", validate(signUpValidator),userSignUp)

userRouter.post("/login", validate(loginValidator), userLogin)

userRouter.get("/auth-check", verifyToken, checkUser)

userRouter.get("/logout", userLogout)

export default userRouter;

