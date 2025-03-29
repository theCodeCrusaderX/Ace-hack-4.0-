import axios from "axios";

export const detectAIContent = async (content) => {
    try {
        const response = await axios.post("https://api.sapling.ai/api/v1/aidetect", {
            text: content
        });

        return response.data.score > 0.7; // If score > 70%, it's AI-generated
    } catch (error) {
        console.error("AI Detection Failed:", error.message);
        return false;
    }
};
