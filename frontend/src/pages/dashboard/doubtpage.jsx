import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DoubtPage = () => {
    const { doubtId } = useParams(); // Get the doubtId from the URL
    const [doubt, setDoubt] = useState(null); // State to store the fetched doubt
    const [error, setError] = useState(null); // State to store any error messages
    const [loading, setLoading] = useState(true); // State to show loading status

    useEffect(() => {
        const fetchDoubt = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`http://localhost:8000/api/doubt/${doubtId}`, {
                    withCredentials: true, // Include credentials for CORS
                });
                setDoubt(response.data.doubt); // Access the doubt object from the response
                setError(null); // Clear any previous errors
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch the doubt");
            } finally {
                setLoading(false);
            }
        };

        fetchDoubt();
    }, [doubtId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Doubt Details</h1>
                {doubt ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">{doubt.title}</h2>
                        <p className="text-gray-600 mb-4">
                            <strong className="text-gray-800">Description:</strong> {doubt.description}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong className="text-gray-800">Tip Amount:</strong> ${doubt.tipAmount}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong className="text-gray-800">Status:</strong>{" "}
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    doubt.status === "open"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                            >
                                {doubt.status}
                            </span>
                        </p>
                        {doubt.selectedAnswer ? (
                            <p className="text-gray-600">
                                <strong className="text-gray-800">Selected Answer:</strong> {doubt.selectedAnswer}
                            </p>
                        ) : (
                            <p className="text-gray-600">
                                <strong className="text-gray-800">Selected Answer:</strong> None
                            </p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">No doubt found.</p>
                )}
            </div>
        </div>
    );
};

export default DoubtPage;