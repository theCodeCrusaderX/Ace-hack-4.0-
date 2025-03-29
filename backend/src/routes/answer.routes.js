import express from "express";
import { postAnswer, selectAnswer } from "../controllers/answer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to post an answer
router.post("/", verifyJWT,postAnswer);

// Route to select an answer
router.patch("/select/:answerId", verifyJWT,selectAnswer);

export default router;