import Doubt from "../models/doubt.model.js";

export const createDoubt = async (req, res) => {
    try {
        const { title, description, tipAmount } = req.body;
        const newDoubt = new Doubt({ user: req.user.userId, title, description, tipAmount });
        await newDoubt.save();

        res.status(201).json({ message: "Doubt created successfully", doubt: newDoubt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const selectanswer = async (req, res) => {
    try {
        const { doubtId, answerId } = req.body;
        const doubt = await Doubt.findById(doubtId);
        if (!doubt) return res.status(404).json({ error: "Doubt not found" });

        doubt.selectedAnswer = answerId;
        doubt.status = "closed";
        await doubt.save();

        res.status(200).json({ message: "Answer selected successfully", doubt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getDoubtsByUserId = async (req, res) => {
    try {
        const { userId } = req.user._id;
        const doubts = await Doubt.find({ user: userId });

        if (!doubts || doubts.length === 0) {
            return res.status(404).json({ error: "No doubts found for this user" });
        }

        res.status(200).json({ doubts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
