import { Router } from "express";
import { createCodingTest , deleteCodingTest} from "../controllers/codingQuestionController";
import { getcodingtest } from "../controllers/CodingTestController";

const Codingtestrouter = Router();

Codingtestrouter.post("/createCodingtest",createCodingTest);

// Codingtestrouter.post("/createcodingquestion",createcodingQuestion)
Codingtestrouter.delete("/deletecodingtest",deleteCodingTest);

Codingtestrouter.get("/getcodingtest", getcodingtest);

// Codingtestrouter.get("/getcodingquestion",getCodingQuestion),
export default Codingtestrouter;