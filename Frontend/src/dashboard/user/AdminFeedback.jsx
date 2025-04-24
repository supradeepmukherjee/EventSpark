import React, { useState, useEffect } from "react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");

        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/contact/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        setFeedbacks(data.queries || []);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-4">
      <h3 className="text-2xl font-bold text-gray-700 mb-6">Admin Feedback</h3>

      <div className="space-y-6">
        {feedbacks.length ? (
          feedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-5 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-lg font-semibold text-blue-600">
                  Subject: {fb.subject}
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    fb.isResolved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {fb.isResolved ? "Resolved" : "Pending"}
                </span>
              </div>

              <p className="text-gray-800">
                <strong>Query:</strong> {fb.msg}
              </p>

              <p className="text-green-700">
                <strong>Admin Reply:</strong> {fb.reply || "No response yet"}
              </p>

              <div className="text-sm text-gray-600">
                <p>
                  <strong>Name:</strong> {fb.name} &nbsp; | &nbsp;
                  <strong>Email:</strong> {fb.email}
                </p>
                <p>
                  <strong>Phone:</strong> {fb.phone}
                </p>
              </div>
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
