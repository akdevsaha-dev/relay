import express from "express"
import { createConversation, getAllConversations } from "../controllers/conversation.controller.js"

const router = express.Router()

router.post("/create", createConversation)
router.get("getConversations/:userId", getAllConversations)


export default router