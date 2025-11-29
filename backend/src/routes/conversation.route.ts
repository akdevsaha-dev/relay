import express from "express"
import { createConversation, createGroupConversation, getAllConversations } from "../controllers/conversation.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/create", protectRoute, createConversation)
router.get("/getConversations", protectRoute, getAllConversations)
router.post("/createGroup", createGroupConversation)

export default router