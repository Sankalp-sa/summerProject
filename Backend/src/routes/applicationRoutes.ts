import { userLogin } from './../controllers/userControllers';
import { Router, Request } from 'express';
import multer from 'multer'
import { verifyToken } from '../utils/verifyJWT';
import { sendApplication } from '../controllers/applicationControllers';
import fs from 'fs'

const storage = multer.diskStorage({

    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        const path = `./uploads/${req.body.user_id}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const applicationRouter = Router()

// applicationRouter.use(verifyToken)

applicationRouter.post("/send", verifyToken, upload.fields([{name: "id_proof"}, {name: "photo"}]), sendApplication)

export default applicationRouter