import { Request, Response } from "express";
import Notification from "../models/Notification";

export const getAllNotifications = async (req: Request, res: Response) => {

    const notifications = Notification.find();

    res.status(200).json({
        notifications
    })
}

export const createNotification = async (req: Request, res: Response) => {

    const {status, message, recipient} = req.body;

    console.log(req.body)

    const notification = new Notification({
        status,
        message,
        recipient
    });

    await notification.save();

    res.status(201).json({
        notification,
        message: "Notification created successfully"
    })

}


export const updateNotification = async (req: Request, res: Response) => {

    const {id, status, message, recipient} = req.body;

    const notification = await Notification.findByIdAndUpdate(id, {
        status,
        message,
        recipient
    });

    res.status(200).json({
        notification,
        message: "Notification updated successfully"
    })

}

export const deleteNotification = async (req: Request, res: Response) => {

    const {id} = req.body;

    const notification = await Notification.findByIdAndDelete(id);

    res.status(200).json({
        notification,
        message: "Notification deleted successfully"
    })

}