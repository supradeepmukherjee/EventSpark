import React from "react";

const Categories = () => {
  const categories = [
    "Birthday",
    "Wedding",
    "Workshops",
    "Business Conferences",
    "Music",
    "Parties",
  ];

  return (
    <section className="categories py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Kolkata's Most-Loved
      </h2>
      <div className="category-cards flex flex-wrap justify-center gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card bg-white shadow-md p-4 rounded-lg max-w-xs text-center"
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
