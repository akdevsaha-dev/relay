import express from "express"
import { Logout, Signin, Signup } from "../controllers/auth.controller.js";

const router = express.Router()

router.post("/signup", Signup)
router.post("/signin", Signin)
router.post("/logout", Logout)

export default router;