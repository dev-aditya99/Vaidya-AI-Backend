import express from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.routes.js";
import diseaseRouter from "./routes/disease.routes.js";

// dotenv configuration
dotenv.config();

// server port 
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)

const _dirname = path.resolve();


// app.uses 
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["POST", "GET"]
}));

// routes 
app.use("/auth", authRouter);
app.use("/disease", diseaseRouter);


// Listen Server 
server.listen(PORT, () => {
    connectToMongoDB()
    console.log("Server Running on PORT " + PORT);
})