import express from "express"
import { setAbout, setProfilePicture } from "../controllers/setttings.controller.js"

const router = express.Router()

router.post("/setProfilePicture",  ,  setProfilePicture)
router.post("/setAbout", setAbout)

export default router