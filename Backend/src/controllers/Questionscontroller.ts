import { cookieParser } from "cookie-parser";
import { Request, Response, NextFunction, response } from "express";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/tokenUtils.js";
import Question from "../models/Question.js";
import Test from "../models/Test.js";
// import Question from "../models/Question.js"

export const createquestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    test_id,
    question,
    option1,
    option2,
    option3,
    option4,
    correctoption,
  } = req.body;

  const test = await Test.findById(test_id);

  if (!test) {
    return res.status(401).json({
      message: "Test not found",
    });
  }

  console.log(req.body);

  const new_question = new Question({
    question,
    option1,
    option2,
    option3,
    option4,
    correctoption,
  });

  const existingquestion = await Question.findOne({ question });

  //  Question.delete({

  //  })

  if (existingquestion) {
    return res.status(401).json({
      message: "Question already exist",
    });
  }

  const newQuestion = await new_question.save();

    test.questionArray.push(newQuestion._id);

    await test.save();

  return res.status(200).json({ message: "question created successfully" });
};

export const modifyquestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, question, option1, option2, option3, option4, correctoption } =
    req.body;
  const updateit = await Question.findByIdAndUpdate(id, {
    question,
    option1,
    option2,
    option3,
    option4,
    correctoption,
  });

  return res.status(200).json({ message: "Question successfully updated" });
};

export const viewquestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const viewques = await Question.findById(id);
  res.send(viewques);
};

export const deletequestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;
  const deleteques = await Question.findByIdAndDelete(id);
  return res.status(200).json({ message: "Deleted question successfully" });
};
