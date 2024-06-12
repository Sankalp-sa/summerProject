// import { updatetest } from './../controllers/testcontroller';
import { createtest, getSingleTest, getTests,deletetest,updatetest } from "../controllers/testcontroller";
import { Router } from "express";

const Tests = Router();

Tests.post("/createTest",createtest);
Tests.get("/getTest",getTests);
Tests.get("/getSingleTest/:id",getSingleTest);
Tests.delete("/deleteTest",deletetest);
Tests.put("/updateTest",updatetest);

export default Tests;
