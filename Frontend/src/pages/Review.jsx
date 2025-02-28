import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const reviews = [
  {
    id: 1,
    name: "Rahul Majhi",
    image: "/images/Client-1.jpg",
    review:
      "I had an amazing experience with this company! The customer service was outstanding, and the product exceeded my expectations.",
  },
  {
    id: 2,
    name: "Jeoa Chon",
    image: "/images/client-2.jpg",
    review:
      "I had an amazing experience with this company! The customer service was outstanding, and the product exceeded my expectations.",
  },
  {
    id: 3,
    name: "Rakue Sues",
    image: "/images/client-3.jpg",
    review:
      "I had an amazing experience with this company! The customer service was outstanding, and the product exceeded my expectations.",
  },
  {
    id: 4,
    name: "Kasua Buay",
    image: "/images/client-4.jpg",
    review:
      "I had an amazing experience with this company! The customer service was outstanding, and the product exceeded my expectations.",
  },
];

const Review = () => {
  return (
    <section className="py-10 px-6 bg-[#121212]" id="review">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">
        Client&apos;s <span className="text-blue-500">Review</span>
      </h1>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="w-full max-w-3xl mx-auto"
      >
        {reviews.map((client) => (
          <SwiperSlide
            key={client.id}
            className="p-6 bg-[#2a2a2a] rounded-lg shadow-lg"
          >
            <i className="fas fa-quote-right text-blue-400 text-2xl mb-3"></i>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={client.image}
                alt={client.name}
                className="w-12 h-12 rounded-full border-2 border-blue-400"
              />
              <div>
                <h3 className="font-semibold text-white">{client.name}</h3>
                <span className="text-sm text-gray-400">Happy Client</span>
              </div>
            </div>
            <p className="text-gray-300">{client.review}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Review;
