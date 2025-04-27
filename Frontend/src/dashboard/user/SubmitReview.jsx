import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const SubmitReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state?.eventId || !state?.userId) {
      setMessage("Missing event or user information.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${import.meta.env.VITE_SERVER}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          event: state.eventId,
          user: state.userId,
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Review submitted successfully!");
        setTimeout(() => navigate("/customer-dashboard"), 2000);
      } else {
        setMessage(data.message || "⚠️ Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("🚫 Server error while submitting review.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          <Star className="inline-block mb-1 mr-1 text-yellow-500" /> Submit
          Your Review
        </h2>

        {message && (
          <div className="mb-4 p-3 rounded text-sm text-white font-medium bg-purple-500 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Rating (1 to 5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              placeholder="Share your experience with this event..."
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitReview;
