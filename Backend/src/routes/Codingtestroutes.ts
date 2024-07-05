import { Router } from "express";
import { createCodingTest , deleteCodingTest} from "../controllers/codingQuestionController";

const Codingtestrouter = Router();

Codingtestrouter.post("/createCodingtest",createCodingTest);

// Codingtestrouter.post("/createcodingquestion",createcodingQuestion)
Codingtestrouter.delete("/deletecodingtest",deleteCodingTest);
// Codingtestrouter.get("/getcodingquestion",getCodingQuestion),
export default Codingtestrouter;