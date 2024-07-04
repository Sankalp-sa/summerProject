import { Router } from 'express'
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';
import applicationRouter from './applicationRoutes.js';
// import Question from '../models/Question.js';
import Questions from './Questions_routes.js';

import Tests from './Testroutes.js';
import notificationRouter from './notificationRoutes.js';
import codeRouter from './codeRoutes.js';
import codingQuestionRouter from './codingQuestionRoutes.js';

const router = Router()

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/application", applicationRouter);
router.use("/question",Questions);
router.use("/test",Tests);
router.use("/notification",notificationRouter);
router.use("/code", codeRouter);
router.use("/codingQuestion", codingQuestionRouter);

export default router