import React, { useState, useEffect } from "react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage

        const feedbacksRes = await fetch(
          `${import.meta.env.VITE_SERVER}/contact/feedback/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const feedbackData = await feedbacksRes.json();
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-700 mb-4">Admin Feedback</h3>
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        {feedbacks.length ? (
          feedbacks.map((fb, idx) => (
            <div key={idx} className="border-b pb-3">
              <p className="font-medium text-gray-800">
                Your Query: {fb.query}
              </p>
              <p className="text-green-600 mt-1">
                Admin Response: {fb.response}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(fb.respondedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No feedback available yet.</p>
        )}
      </div>
    </section>
  );
};

export default AdminFeedback;
