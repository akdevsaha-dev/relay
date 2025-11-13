import express from "express"
import { createConversation, createGroupConversation, getAllConversations } from "../controllers/conversation.controller.js"

const router = express.Router()

router.post("/create", createConversation)
router.get("getConversations/:userId", getAllConversations)
router.post("/createGroup", createGroupConversation)

export default router