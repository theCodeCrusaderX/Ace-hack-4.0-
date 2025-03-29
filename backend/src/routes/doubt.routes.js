import express from "express";
import { createDoubt,selectanswer,getDoubtsByUserId} from "../controllers/doubt.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to create a new doubt
router.post("/",verifyJWT, createDoubt);


router.patch("/select", verifyJWT,selectanswer);
router.get("/alldoubt", verifyJWT,getDoubtsByUserId);

export default router;