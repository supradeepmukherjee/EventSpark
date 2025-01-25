import React from "react";

const Categories = () => {
  const categories = [
    { name: "Birthday", image: "/img/birthday.webp" },
    { name: "Wedding", image: "/img/wedding.webp" },
    { name: "Workshops", image: "/img/Workshops.webp" },
    { name: "Festival", image: "/img/Festivals.webp" },
    { name: "Music", image: "/img/Music.webp" },
    { name: "Parties", image: "/img/Parties.webp" },
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
            <img
              src={category.image}
              alt={category.name}
              style={{ height: "85px" }}
            />
            {category.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
