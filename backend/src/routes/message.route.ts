import express from "express"
import { createMessage, getMessage } from "../controllers/message.controller.js"

const router = express.Router()

router.post("/createMessage", createMessage)
router.get("/getMessages/:conversationId", getMessage)
router.delete("/deleteMessage",)
export default router