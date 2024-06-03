import { Router, Request } from 'express'; 
import { sendApplication } from '../controllers/applicationControllers';
import multer from 'multer'
import { verifyToken } from '../utils/verifyJWT';

const storage = multer.diskStorage({

    destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, `./uploads/${req.body.user.id}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

const applicationRouter = Router()

applicationRouter.use(verifyToken)

applicationRouter.post("/send", upload.fields([{name: "id_proof"}, {name: "photo"}]), sendApplication)

export default applicationRouter