import { Router } from 'express'
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';

const router = Router()

router.use("/user", userRouter);
router.use("/chat", chatRouter);

export default router