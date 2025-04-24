import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

// Helper to get initials from name
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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

  // 30 Dummy reviews data with ratings
  const dummyReviews = [
    {
      id: 1,
      name: "Rahul Majhi",
      review: "Amazing experience with the service. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jeoa Chon",
      review: "The event was perfect! Loved every moment of it.",
      rating: 1,
    },
    {
      id: 3,
      name: "Rakue Sues",
      review: "Very professional and everything went smoothly. Excellent team!",
      rating: 4,
    },
    {
      id: 4,
      name: "Kasua Buay",
      review: "Highly satisfied with the services. Will definitely use again.",
      rating: 5,
    },
    {
      id: 5,
      name: "Aiden Paul",
      review: "A flawless event! Everything was well-organized.",
      rating: 4,
    },
    {
      id: 6,
      name: "Shani Fearn",
      review: "A wonderful experience. The team made the event unforgettable!",
      rating: 5,
    },
    {
      id: 7,
      name: "Tina Mages",
      review:
        "Outstanding event management. The attention to detail was amazing!",
      rating: 5,
    },
    {
      id: 8,
      name: "Ben Timmons",
      review: "Had an excellent time. Everything was planned to perfection.",
      rating: 4,
    },
    {
      id: 9,
      name: "Lily Maxon",
      review: "Fantastic! Everything was beyond expectations!",
      rating: 5,
    },
    {
      id: 10,
      name: "Kira Shane",
      review:
        "Extremely happy with the service provided. Would definitely recommend.",
      rating: 5,
    },
    {
      id: 11,
      name: "Paul Winston",
      review: "A seamless event from start to finish. Highly professional.",
      rating: 3,
    },
    {
      id: 12,
      name: "Mira Ford",
      review:
        "Great experience! It was such a pleasure working with this team.",
      rating: 5,
    },
    {
      id: 13,
      name: "John Cena",
      review:
        "The service was great! I would highly recommend this to my friends.",
      rating: 4,
    },
    {
      id: 14,
      name: "Sam Andrews",
      review: "A great team! Very professional and easy to work with.",
      rating: 3,
    },
    {
      id: 15,
      name: "Olivia Green",
      review:
        "Had an unforgettable experience. Very satisfied with the outcome.",
      rating: 5,
    },
    {
      id: 16,
      name: "Luke White",
      review:
        "Top-notch service! The team went above and beyond to make everything perfect.",
      rating: 4,
    },
    {
      id: 17,
      name: "Emma Stone",
      review:
        "Everything was organized well and everyone had a fantastic time!",
      rating: 5,
    },
    {
      id: 18,
      name: "Sophia Black",
      review:
        "I couldn't ask for better service. Highly impressed with everything.",
      rating: 5,
    },
    {
      id: 19,
      name: "Jack Brooks",
      review: "Perfect event management. Everything went as planned!",
      rating: 4,
    },
    {
      id: 20,
      name: "Mia Collins",
      review:
        "I’m so happy with the results! Great communication and execution.",
      rating: 5,
    },
    {
      id: 21,
      name: "Aaron Lewis",
      review:
        "The team made my event a huge success. So thankful for their hard work!",
      rating: 4,
    },
    {
      id: 22,
      name: "Chloe Miller",
      review: "Outstanding service and attention to detail. Highly recommend!",
      rating: 5,
    },
    {
      id: 23,
      name: "Daniel Black",
      review: "Flawless execution. Couldn’t ask for a better event!",
      rating: 3,
    },
    {
      id: 24,
      name: "Nina White",
      review: "Great team, professional service, would definitely hire again!",
      rating: 4,
    },
    {
      id: 25,
      name: "Isaac Green",
      review:
        "Everything was handled perfectly. I couldn't have asked for more.",
      rating: 5,
    },
    {
      id: 26,
      name: "Eva Brown",
      review:
        "The best event planning team I’ve ever worked with. Very thorough!",
      rating: 4,
    },
    {
      id: 27,
      name: "Oliver King",
      review:
        "The service exceeded my expectations! Very happy with the outcome.",
      rating: 5,
    },
    {
      id: 28,
      name: "Amelia Moore",
      review: "A highly professional team. I’m so glad I worked with them!",
      rating: 5,
    },
    {
      id: 29,
      name: "Charlotte Lee",
      review: "Amazing experience. The event went off without a hitch!",
      rating: 5,
    },
    {
      id: 30,
      name: "Michael Smith",
      review: "From start to finish, everything was perfect. Very pleased!",
      rating: 5,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllReviews(dummyReviews);
      setVisibleReviews(dummyReviews.slice(0, REVIEWS_PER_PAGE));
      setLoading(false);
    }, 500);
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
                key={client.id}
                className="bg-[#1f1f1f] p-6 rounded-2xl shadow-xl hover:shadow-blue-500/30 transition-all"
              >
                {/* Logo and Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                    {getInitials(client.name)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-400">Happy Client</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex justify-start gap-2 mb-4">
                  <StarRating rating={client.rating} />
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm">{client.review}</p>
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
