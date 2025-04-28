import React from "react";

export const Pricing = () => {
  const plans = [
    { title: "For Birthdays", price: "24999" },
    { title: "For Weddings", price: "45099" },
    { title: "For Concerts", price: "65099" },
    { title: "For Others", price: "85099" },
  ];

  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="price">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-blue-500">Pricing</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-b from-[#2a2a2a] to-[#1e1e1e] backdrop-blur-sm border border-gray-700 p-6 rounded-2xl text-center shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-2 transition-all duration-300 animate-float"
          >
            {/* Best Value badge */}
            {index === 1 && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded-full">
                Best Value
              </div>
            )}

            {/* Plan Title */}
            <h3 className="text-2xl font-extrabold text-white mb-2">
              {plan.title}
            </h3>

            {/* Plan Price */}
            <h3 className="text-3xl font-bold text-blue-400 mb-4">
              ₹{parseInt(plan.price).toLocaleString("en-IN")}
            </h3>

            {/* Features List */}
            <ul className="text-gray-300 text-sm space-y-3 mb-6">
              <li>🎉 Full Services</li>
              <li>🌸 Decoration</li>
              <li>🎶 Music & Photos</li>
              <li>🍽️ Food & Drink</li>
              <li>✉️ Invitation Card</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};
