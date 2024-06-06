import { Router } from 'express'
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';
import applicationRouter from './applicationRoutes.js';

const router = Router()

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/application", applicationRouter);
export default router