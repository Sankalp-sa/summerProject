import { Request, Response, NextFunction } from 'express';
import Application from '../models/Application';

export const sendApplication = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { Student_id, ssc_percentage, hsc_percentage, jee_percentile, gujcet_percentile, user } = req.body

        if (!Student_id || !ssc_percentage || !hsc_percentage || !jee_percentile || !gujcet_percentile) {
            return res.status(400).json({
                message: "Please provide all the details"
            })
        }
        
        const id_proof = req.files['id_proof'][0].filename
        const photo = req.files['photo'][0].filename

        //write the code to Save the application to the database

        const newApplication = new Application({
            Student_id,
            ssc_percentage,
            hsc_percentage,
            jee_percentile,
            gujcet_percentile,
            id_proof,
            photo
        })

        await newApplication.save()

        return res.status(200).json({
            message: "Application sent successfully"
        })

    } catch (error) {
        
        console.log(error)

        return res.status(500).json({
            message: "Internal Server Error"
        })

    }

}