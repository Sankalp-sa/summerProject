import { createquestion , modifyquestion , viewquestion , deletequestion} from './../controllers/Questionscontroller';
import { Router } from "express";
import Question from "../models/Question";
import router from "./mainRoute";
// import createquestion

const Questions = Router();

Questions.put("/modifyquestion",modifyquestion)

Questions.post("/createquestion",createquestion)

Questions.get("/viewquestion",viewquestion)

Questions.delete("/deletequestion",deletequestion)


export default Questions