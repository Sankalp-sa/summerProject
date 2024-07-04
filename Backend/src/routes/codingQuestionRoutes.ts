import exp from 'constants';
import { Router } from 'express';
import { codeSubmitController, createCodingQuestionController, getCodingQuestionController, getSingleCodingQuestionController } from '../controllers/CodingQuestionControllers';

const codingQuestionRouter = Router();

codingQuestionRouter.post("/create", createCodingQuestionController);
codingQuestionRouter.post("/submit", codeSubmitController);
codingQuestionRouter.get("/get", getCodingQuestionController);
codingQuestionRouter.get("/getQuestion/:id", getSingleCodingQuestionController)

export default codingQuestionRouter;
