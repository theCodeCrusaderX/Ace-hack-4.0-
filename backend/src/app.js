import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: true, // Allow all origins
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
app.use("/api/user", userRouter)
import AnswerRoute from "./routes/answer.routes.js"
app.use("/api/answer", AnswerRoute)

import DoubtRoute from "./routes/doubt.routes.js"
app.use("/api/doubt", DoubtRoute)

export {app}
