import { calculatescore, getUserTests, sorted_student } from './../controllers/testcontroller';
// import { updatetest } from './../controllers/testcontroller';
import { createtest, getSingleTest, getTests,deletetest,updatetest } from "../controllers/testcontroller";
import { Router } from "express";

const Tests = Router();

Tests.post("/createTest",createtest);
Tests.get("/getTest",getTests);
Tests.get("/getSingleTest/:id",getSingleTest);
Tests.delete("/deleteTest",deletetest);
Tests.put("/updateTest",updatetest);
Tests.post("/calculate_score",calculatescore);
Tests.get("/getUserTest/:id", getUserTests);
Tests.get("/getsorted_students",sorted_student);

export default Tests;
