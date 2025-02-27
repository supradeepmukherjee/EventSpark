// Pricing Component
export const Pricing = () => {
  const plans = [
    { title: "For Birthdays", price: "$250.99" },
    { title: "For Weddings", price: "$450.99" },
    { title: "For Concerts", price: "$650.99" },
    { title: "For Others", price: "$850.99" },
  ];
  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="price">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our <span className="text-blue-500">Pricing</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gray-700 p-6 rounded-lg text-center shadow-lg"
          >
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <h3 className="text-2xl font-semibold text-blue-400">
              {plan.price}
            </h3>
            <ul className="text-gray-300 mt-4 space-y-2">
              <li>✔ Full Services</li>
              <li>✔ Decoration</li>
              <li>✔ Music & Photos</li>
              <li>✔ Food & Drink</li>
              <li>✔ Invitation Card</li>
            </ul>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
              Check Out
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
