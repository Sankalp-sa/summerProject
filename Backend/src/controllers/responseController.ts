import { Request, Response, NextFunction } from "express";
import response from "../models/response";
import Question from "../models/Question";

export const calculatescore = async (req:Request , res:Response , nex:NextFunction) => {
    try{
        const {student , testid,question_array} = req.body;

        let marks=0;
        for(let i=0;i<question_array.length;i++){
            const i_d = await Question.findById(question_array[i].questionId);
            if(question_array[i].answer != -1){
                if(question_array[i].answer == i_d.correctoption){
                    marks += 1;
                }
                else{
                    marks -= 1;
                }
            }
        }
        console.log(student,testid,question_array);

        const new_res = new response({
            testId : testid,
            studentId : student,
            score : marks,
            responses : question_array,
            
        })
        
        await new_res.save();
        return res.status(200).json({
            message : "Score calculated successfully"
        })
    }
    catch(error){
        console.log(error);
    }
}