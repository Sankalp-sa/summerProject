import { Request, Response } from "express";
import CodingQuestion from "../models/CodingQuestion";

import axios from "axios";
import test from "node:test";
import { LANGUAGE_VERSIONS } from "../constants/language";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const createCodingQuestionController = async (
  req: Request,
  res: Response
) => {
  const { title, description, testCases, solution } = req.body;

  if (!title || !description || !testCases || !solution) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  // find the output of the testcase by running the solution code

  const language = "cpp";
  for (let i = 0; i < testCases.length; i += 1) {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: solution,
        },
      ],
      stdin: testCases[i].input,
    });

    // const data = response.data;

    // console.log(data);

    testCases[i].output = response.data.run.output;
  }

  console.log(testCases);

  const newCodingQuestion = new CodingQuestion({
    title,
    description,
    testCases,
    solution,
  });

  await newCodingQuestion.save();

  console.log(newCodingQuestion);

  return res.status(200).json({
    message: "Coding question created successfully",
    data: newCodingQuestion,
  });
};

export const codeSubmitController = async (req, res) => {
  const { language, code, questionId } = req.body;

  if (!language || !code || !questionId) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  const question = await CodingQuestion.findById(questionId);

  let testCaseResult = [];

  if (!question) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  for (let i = 0; i < question.testCases.length; i += 1) {
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
      stdin: question.testCases[i].input,
    });

    const expectedOutput = question.testCases[i].output
      .trim()
      .replace(/\n/g, "");
    const actualOutput = response.data.run.output.trim().replace(/\n/g, "");

    if (actualOutput === expectedOutput) {
      testCaseResult.push({
        input: question.testCases[i].input,
        output: question.testCases[i].output,
        result: "Passed",
      });
    } else {
      testCaseResult.push({
        input: question.testCases[i].input,
        output: question.testCases[i].output,
        result: "Failed",
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
      });
    }
  }

  return res.status(200).json({
    message: "Code submitted successfully",
    data: {
      testCaseResult,
    },
  });
};

export const getCodingQuestionController = async (
  req: Request,
  res: Response
) => {
  const codingQuestions = await CodingQuestion.find().select(
    "-solution -testCases -variables"
  );

  return res.status(200).json({
    message: "Coding questions fetched successfully",
    data: codingQuestions,
  });
};

export const getSingleCodingQuestionController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    // Fetch the coding question by its ID
    const codingQuestion = await CodingQuestion.findById(id);

    if (!codingQuestion) {
      return res.status(404).json({ message: "Coding question not found" });
    }

    // Extract the first three test cases
    const limitedTestCases = codingQuestion.testCases.slice(0, 3);

    // Send the question details along with the first three test cases
    return res.status(200).json({
      title: codingQuestion.title,
      description: codingQuestion.description,
      difficulty: codingQuestion.difficulty,
      tags: codingQuestion.tags,
      solution: codingQuestion.solution,
      testCases: limitedTestCases,
      createdAt: codingQuestion.createdAt,
      variables: codingQuestion.variables,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
