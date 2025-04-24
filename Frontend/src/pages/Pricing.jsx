import React, { useEffect, useState } from "react";

export const Pricing = () => {
  const dummyPlans = [
    { title: "For Birthdays", price: "24999" },
    { title: "For Weddings", price: "45099" },
    { title: "For Concerts", price: "65099" },
    { title: "For Others", price: "85099" },
  ];

  const [plans, setPlans] = useState(dummyPlans);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/pricing`);
        const data = await response.json();
        if (data.plans && data.plans.length > 0) {
          setPlans(data.plans);
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        // fallback to dummyPlans already set
      }
    };

    fetchPlans();
  }, []);

  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="price">
      <h1 className="text-3xl font-bold text-center mb-12">
        Our <span className="text-blue-500">Pricing</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
            <h3 className="text-3xl font-bold text-blue-400 mb-4">
              ₹{parseInt(plan.price).toLocaleString("en-IN")}
            </h3>
            <ul className="text-gray-300 text-sm space-y-3 mb-6">
              <li>🎉 Full Services</li>
              <li>🌸 Decoration</li>
              <li>🎶 Music & Photos</li>
              <li>🍽️ Food & Drink</li>
              <li>✉️ Invitation Card</li>
            </ul>
            <button className="w-full py-2 bg-gradient-to-r cursor-pointer from-blue-500 to-indigo-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300">
              Check Out
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
