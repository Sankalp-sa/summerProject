import { Router } from 'express';
import { runCodeController } from '../controllers/CodeControllers';

const codeRouter = Router()

codeRouter.use("/runcode/:language", runCodeController);


export default codeRouter  