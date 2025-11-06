import dotenv from 'dotenv';
import express from "express";
import authRoute from "./routes/auth.route.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
//# sourceMappingURL=index.js.map