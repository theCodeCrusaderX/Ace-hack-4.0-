import express from "express";
import { createDoubt,selectanswer} from "../controllers/doubt.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to create a new doubt
router.post("/",verifyJWT, createDoubt);


router.patch("/select", verifyJWT,selectanswer);

export default router;