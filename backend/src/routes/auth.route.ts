import express from "express"
import { checkAuth, Logout, Signin, Signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router()

router.post("/signup", Signup)
router.post("/signin", Signin)
router.post("/logout", Logout)
router.get("/checkAuth", protectRoute, checkAuth)
export default router;