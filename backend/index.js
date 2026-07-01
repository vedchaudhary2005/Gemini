import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"


const app=express()
const allowedOrigins = [
    "http://localhost:5173",
    "https://gemini-gamma-hazel.vercel.app"
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/$/, ""));
}

app.use(cors({
    origin: allowedOrigins,
    credentials:true
}))
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.get("/", (req, res) => {
    res.send("Gemini Backend is running 🚀");
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)


connectDb()
app.listen(port,()=>{
    console.log("server started")
})

