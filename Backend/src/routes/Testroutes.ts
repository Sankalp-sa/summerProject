import { calculatescore, getResponse, getTestWithResponse, getUserTests, sorted_student, startTest } from './../controllers/testcontroller';
// import { updatetest } from './../controllers/testcontroller';
import { createtest, getSingleTest, getTests,deletetest,updatetest } from "../controllers/testcontroller";
import { Router } from "express";
import { isAdmin } from '../utils/checkAdmin';
import { verifyToken } from '../utils/verifyJWT';

const Tests = Router();

Tests.post("/createTest", verifyToken,isAdmin,createtest);
Tests.get("/getTest",getTests);
Tests.get("/getSingleTest/:id",getSingleTest);
Tests.delete("/deleteTest",deletetest);
Tests.put("/updateTest",updatetest);

// response related routes

Tests.post("/calculate_score",calculatescore);
Tests.get("/getUserTest/:id", getUserTests);
Tests.get("/getsorted_students",sorted_student);
Tests.post("/startTest", startTest);
Tests.get("/getResponse", getResponse);

Tests.get("/getTestWithResponse/:id", getTestWithResponse);

export default Tests;
