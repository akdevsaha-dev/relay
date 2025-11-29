import express from "express"
import { createConversation, createGroupConversation, getAllConversations, getConversation } from "../controllers/conversation.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router()

router.post("/create", protectRoute, createConversation)
router.get("/getConversations", protectRoute, getAllConversations)
router.post("/createGroup", createGroupConversation)
router.get("/:conversationId", getConversation)

export default router