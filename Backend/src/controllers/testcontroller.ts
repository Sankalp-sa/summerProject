import { Request, Response, NextFunction } from "express";
// import Test/ from "../models/Test"
import Test from "../models/Test";
import Question from "../models/Question";
import StudentResponse from "../models/response";

export const createtest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start_time, end_time, name } = req.body;
    const new_test = new Test({
      test_name: name,
      start_time,
      end_time,
    });
    await new_test.save();

    res.status(200).json({
      message: "Test created successfully",
      data: new_test,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const tests = await Test.find();
    res.status(200).json({
      message: "All tests",
      data: tests,
    });
  } catch (error) {
    console.log(error);
  }
};

// get single test using test id

export const getSingleTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json({
      message: "Test",
      data: test,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletetest = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deleted = Test.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted Test successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const updatetest = async (req: Request, res: Response) => {
  try {
    const { id, start_time, end_time, name, questionArray } = req.body;

    console.log(req.body);

    const updated = await Test.findByIdAndUpdate(id, {
      start_time,
      end_time,
      test_name: name,
    });

    console.log(updated);

    for (let i = 0; i < questionArray.length; i++) {
      await Question.findByIdAndUpdate(questionArray[i]._id, {
        question: questionArray[i].question,
        option1: questionArray[i].option1,
        option2: questionArray[i].option2,
        option3: questionArray[i].option3,
        option4: questionArray[i].option4,
        correctoption: questionArray[i].correctoption,
      });
    }

    return res
      .status(200)
      .json({ ok: true, message: "Updated test successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const calculatescore = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  try {
    const { student, testid, question_array } = req.body;

    let marks = 0;
    for (let i = 0; i < question_array.length; i++) {
      const i_d = await Question.findById(question_array[i].questionId);
      if (question_array[i].answer != -1) {
        if (question_array[i].answer == i_d.correctoption) {
          marks += 1;
        } else {
          marks -= 1;
        }
      }
    }
    console.log(student, testid, question_array);

    const new_res = new StudentResponse({
      testId: testid,
      studentId: student,
      score: marks,
      responses: question_array,
    });

    await new_res.save();
    return res.status(200).json({
      message: "Score calculated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserTests = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tests = await StudentResponse.find({ studentId: id });

    let finalTests = []

    for(let i=0; i<tests.length; i++){

      const currTest = await Test.findById(tests[i].testId);

      finalTests.push({
        test: currTest,
      })
    }

    return res.status(200).json({
      message: "User tests",
      data: finalTests,
    });
  } catch (error) {
    console.log(error);
  }
};
