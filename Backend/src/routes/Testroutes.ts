import { createtest } from "../controllers/testcontroller";
import { Router } from "express";

const Tests = Router();

Tests.put("/createtest",createtest);




export default Tests;