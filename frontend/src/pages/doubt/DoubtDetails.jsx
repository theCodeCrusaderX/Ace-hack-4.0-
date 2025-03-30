import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DoubtDetails() {
  const { doubtId } = useParams(); // Get the doubtId from the URL
  console.log("Doubt ID from URL:", doubtId); // Debugging to ensure doubtId is retrieved

  const [doubt, setDoubt] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoubtAndAnswers = async () => {
      try {
        setLoading(true);

        // Fetch the doubt details
        const doubtResponse = await axios.get(
          `http://localhost:8000/api/doubt/alldoubt`, // Correct endpoint with doubtId
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        setDoubt(doubtResponse.data.doubt); // Set the entire doubt object
        console.log("Doubt fetched:", doubtResponse.data.doubt);

        // Fetch the answers for the doubt
        const answersResponse = await axios.get(
          `http://localhost:8000/api/answer/doubt/${doubtId}`, // Correct endpoint with doubtId
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        setAnswers(answersResponse.data.answers);
        console.log("Answers fetched:", answersResponse.data.answers);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch data");
        setLoading(false);
      }
    };

  
      fetchDoubtAndAnswers();
    
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!doubt) {
    return <div className="text-center py-8">Doubt details not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{doubt.title}</h1>
        <p className="text-gray-700 mb-4">{doubt.description}</p>
        <p className="text-sm text-gray-500">Tip Amount: ${doubt.tipAmount}</p>
        <p className="text-sm text-gray-500">Status: {doubt.status}</p>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Answers</h2>
        {answers.length > 0 ? (
          <ul className="space-y-4">
            {answers.map((answer) => (
              <li key={answer._id} className="border border-gray-300 rounded-md p-4">
                <p className="text-gray-700">{answer.content}</p>
                <p className="text-sm text-gray-500 mt-2">By User: {answer.user}</p>
                {answer.isSelected && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-white bg-green-500 rounded">
                    Selected Answer
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No answers available for this doubt.</p>
        )}
      </div>
    </div>
  );
}

export default DoubtDetails;