import { Request, Response } from "express";
import Notification from "../models/Notification";
import { io } from "../app";

export const getAllNotifications = async (req: Request, res: Response) => {
  const notifications = Notification.find();

  res.status(200).json({
    notifications,
  });
};

export const createNotification = async (req: Request, res: Response) => {
  const { status, message, recipient } = req.body;

  console.log(req.body);

  const notification = new Notification({
    status,
    message,
    recipient,
  });

  await notification.save();

  res.status(201).json({
    notification,
    message: "Notification created successfully",
  });
};

export const updateNotification = async (req: Request, res: Response) => {
  const { id, status, message, recipient } = req.body;

  const notification = await Notification.findByIdAndUpdate(id, {
    status,
    message,
    recipient,
  });

  res.status(200).json({
    notification,
    message: "Notification updated successfully",
  });
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.body;

  const notification = await Notification.findByIdAndDelete(id);

  res.status(200).json({
    notification,
    message: "Notification deleted successfully",
  });
};

export const sendNotification = async (req: Request, res: Response) => {

  const { userId, message } = req.body;
  io.to(userId).emit("receiveNotification", message);
  res.status(200).send("Notification sent");

};

export const sendTest = async (req: Request, res: Response) => {

    const { userArray } = req.body;

    // console.log(userArray)

    userArray.forEach((userId: string) => {
        io.to(userId).emit("receiveNotification", "Test Notification");
    });

    res.status(200).send("Notification sent");

}
