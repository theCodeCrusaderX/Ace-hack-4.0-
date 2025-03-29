import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    doubt: { type: mongoose.Schema.Types.ObjectId, ref: "Doubt", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    isSelected: { type: Boolean, default: false },
}, { timestamps: true });

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;
