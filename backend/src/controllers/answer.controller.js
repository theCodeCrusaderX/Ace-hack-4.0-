import Answer from "../models/asnwer.model.js";
import mongoose from "mongoose";
import { detectAIContent } from "./detectcontent.js";

export const postAnswer = async (req, res) => {
    try {
        const { doubtId, content } = req.body;

        const isAI = await detectAIContent(content);

        if (isAI) {
            return res.status(400).json({ error: "AI-generated answers are not allowed." });
        }

        const newAnswer = new Answer({
            doubt: doubtId,
            user: req.user.userId,
            content,
        });

        await newAnswer.save();

        res.status(201).json({ message: "Answer posted successfully", answer: newAnswer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const selectAnswer = async (req, res) => {
    const { answerId } = req.params;

    try {
        
        if (!mongoose.Types.ObjectId.isValid(answerId)) {
            return res.status(400).json({ error: "Invalid answer ID" });
        }

        // Find the answer to ensure it exists
        const answer = await Answer.findById(answerId).populate("doubt");
        if (!answer) {
            return res.status(404).json({ error: "Answer not found" });
        }

        // Ensure only one answer is selected per doubt
        await Answer.updateMany(
            { doubt: answer.doubt._id, isSelected: true },
            { $set: { isSelected: false } }
        );

        // Mark the current answer as selected
        answer.isSelected = true;
        await answer.save();

        res.status(200).json({ message: "Answer selected successfully", answer });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while selecting the answer" });
    }
};
