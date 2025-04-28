import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Helper to get initials from name
const getInitials = (name) => {
  if (!name) return "U"; // Default initial if name is undefined
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Helper to render star rating
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 17.75l6.16 3.24-1.64-7.04L22 8.24l-7.19-.61L12 2 9.19 7.63 2 8.24l5.48 5.71-1.64 7.04L12 17.75z" />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M12 17.75l6.16 3.24-1.64-7.04L22 8.24l-7.19-.61L12 2 9.19 7.63 2 8.24l5.48 5.71-1.64 7.04L12 17.75z" />
        </svg>
      );
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

const Review = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const REVIEWS_PER_PAGE = 6;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/user/review`
        );
        const result = await response.json();
        // console.log(result.reviews);

        // If your backend sends { success: true, data: [...] }
        const allReviews = result.reviews; // fallback if it's direct array

        setAllReviews(allReviews);
        setVisibleReviews(allReviews.slice(0, REVIEWS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * REVIEWS_PER_PAGE;
    const nextReviews = allReviews.slice(
      startIndex,
      startIndex + REVIEWS_PER_PAGE
    );
    if (nextReviews.length) {
      setVisibleReviews(nextReviews);
      setCurrentPage(nextPage);
    }
  };

  const handlePrev = () => {
    const prevPage = currentPage - 1;
    const startIndex = prevPage * REVIEWS_PER_PAGE;
    const prevReviews = allReviews.slice(
      startIndex,
      startIndex + REVIEWS_PER_PAGE
    );
    if (prevReviews.length) {
      setVisibleReviews(prevReviews);
      setCurrentPage(prevPage);
    }
  };

  return (
    <section
      className="py-12 px-6 bg-gradient-to-b from-gray-900 to-black min-h-screen"
      id="review"
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Client&apos;s <span className="text-blue-500">Review</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="animate-spin text-blue-400 w-8 h-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visibleReviews.map((client) => (
              <div
                key={client._id}
                className="bg-[#1f1f1f] p-6 rounded-2xl shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                {/* Logo and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                    {getInitials(client.user.name)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {client.user.name}
                    </h3>
                    <p className="text-sm text-gray-400">Happy Client</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-start gap-2 mb-4">
                  <StarRating rating={client.rating} />
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm">{client.comment}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-6">
            {currentPage > 0 && (
              <button
                onClick={handlePrev}
                className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all"
              >
                ← Show Less Reviews
              </button>
            )}
            {allReviews.length > (currentPage + 1) * REVIEWS_PER_PAGE && (
              <button
                onClick={handleNext}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium shadow-md transition-all"
              >
                Show More Reviews →
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Review;
