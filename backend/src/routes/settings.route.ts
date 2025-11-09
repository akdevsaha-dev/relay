import express from "express"
import { multerMiddleware, setAbout, setProfilePicture } from "../controllers/setttings.controller.js"

const router = express.Router()

router.post("/setProfilePicture", multerMiddleware, setProfilePicture)
router.post("/setAbout", setAbout)

export default router