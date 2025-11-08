import express from "express"
import { createMessage, deleteMessage, getMessage, updateMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.post("/createMessage", createMessage)
router.get("/getMessages/:conversationId", getMessage)
router.delete("/deleteMessage/:messageId", deleteMessage)
router.patch("/update/:messageId", updateMessage)
export default router