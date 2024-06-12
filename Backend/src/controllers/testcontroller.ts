import { Request, Response, NextFunction, response } from "express";
// import Test/ from "../models/Test"
import Test from "../models/Test";

export const createtest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { start_time, end_time, name } = req.body;
    const new_test = new Test({
      test_name: name,
      start_time,
      end_time,
    });
    await new_test.save();

    res.status(200).json({
      message: "Test created successfully",
      data: new_test,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTests = async (req: Request, res: Response) => {
  try {
    const tests = await Test.find();
    res.status(200).json({
      message: "All tests",
      data: tests,
    });
  } catch (error) {
    console.log(error);
  }
}

// get single test using test id

export const getSingleTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json({
      message: "Test",
      data: test,
    });
  } catch (error) {
    console.log(error);
  }
}

export const deletetest = async (req:Request , res:Response) =>{
    try{
      const {id} = req.body;
      const deleted = Test.findByIdAndDelete(id);
      return res.status(200).json({message : "Deleted Test successfully"});
    }
    catch(error){
      console.log(error);
    }
}

export const updatetest = async  (req:Request , res: Response) => {
  try{
    const {id , start_time,end_time, test_name} = req.body;
    const updated = await Test.findByIdAndUpdate(id,{
      start_time,
      end_time,
      test_name

    });
    return res.status(200).json({message:  "Updated test successfully"});
  }
  catch(error){
    console.log(error);
  }
}