import { Request, Response, NextFunction, response } from "express"
// import Test/ from "../models/Test"
import Test from "../models/Test"

export const createtest = async(req:Request , res:Response , next:NextFunction)=>{
       const {questionarray,starttime,endtime,testname}= req.body
       const new_test = new Test({
        testname ,
        questionarray,
        starttime,
        endtime
       })

       
}