import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tipAmount: { type: Number, default: 0 },
    status: { type: String, enum: ["open", "answered", "closed"], default: "open" },
    selectedAnswer: { type: mongoose.Schema.Types.ObjectId, ref: "Answer", default: null }
}, { timestamps: true });

const Doubt = mongoose.model("Doubt", doubtSchema);
export default Doubt;
