import { createtest, getSingleTest, getTests } from "../controllers/testcontroller";
import { Router } from "express";

const Tests = Router();

Tests.post("/createTest",createtest);
Tests.get("/getTest",getTests);
Tests.get("/getSingleTest/:id",getSingleTest);

export default Tests;
