import express from "express";
import { createDoubt, selectanswer, getDoubtsByUserId, getDoubtById } from "../controllers/doubt.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/problems", verifyJWT, createDoubt);


router.patch("/select", verifyJWT, selectanswer);


router.get("/alldoubt", verifyJWT, getDoubtsByUserId);


router.get("/:doubtId", verifyJWT, getDoubtById);

export default router;