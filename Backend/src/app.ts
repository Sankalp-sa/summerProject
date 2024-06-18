import express from "express"
import dotenv from 'dotenv'
import morgan from 'morgan'
import router from "./routes/mainRoute.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

dotenv.config();
const app = express()

app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use(express.json({limit: '50mb'}))
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))
app.use(express.static("public"))

app.use(morgan('dev'));

app.use("/api/v1", router)

export default app