import {Router} from 'express'
import { createNotification, deleteNotification, getAllNotifications, sendNotification, sendTest, updateNotification } from '../controllers/notificationControllers';
import { verifyToken } from '../utils/verifyJWT';
import { isAdmin } from '../utils/checkAdmin';

const notificationRouter = Router();

notificationRouter.get('/getNotifications',getAllNotifications)

notificationRouter.post('/createNotification', verifyToken, isAdmin, createNotification)

notificationRouter.put('/updateNotification', updateNotification)

notificationRouter.delete('/deleteNotification', deleteNotification)

notificationRouter.post("/sendNotification", verifyToken, isAdmin, sendNotification)

notificationRouter.post("/sendTest", verifyToken, isAdmin, sendTest)

export default notificationRouter