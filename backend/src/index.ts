import dotenv from 'dotenv'
import express from "express";
import authRoute from "./routes/auth.route.js"
import contactRoute from "./routes/contact.route.js"
const app = express()
dotenv.config()
app.use(express.json())
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/contact", contactRoute)
app.listen(3000, () => {
    console.log("App is listening on port 3000")
})