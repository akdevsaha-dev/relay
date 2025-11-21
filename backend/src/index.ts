import dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import { createServer } from "http"
import authRoute from "./routes/auth.route.js"
import contactRoute from "./routes/contact.route.js"
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js"
import settingsRoute from "./routes/settings.route.js"
import { initSocket } from './socket/socket.js';
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
const server = createServer(app)

initSocket(server)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/contact", contactRoute)
app.use("/api/v1/message", messageRoute)
app.use("/api/v1/conversation", conversationRoute)
app.use("/api/v1/settings", settingsRoute)


server.listen(3000, () => {
    console.log("App is listening on port 3000")
})
