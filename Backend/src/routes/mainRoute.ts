import { Router } from 'express'
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';
import applicationRouter from './applicationRoutes.js';
// import Question from '../models/Question.js';
import Questions from './Questions_routes.js';

const router = Router()

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/application", applicationRouter);
<<<<<<< HEAD
router.use("/question",Questions);

=======
>>>>>>> a86b54fcc10c8ea6e09595bc87a7045a98ef80fd
export default router