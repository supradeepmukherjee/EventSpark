import React from "react";
import backgroundImage from "/img/download.webp";
const Hero = () => {
  return (
    <section
      className="hero bg-cover bg-center text-center py-16"
      style={{
        backgroundImage: `url(${backgroundImage})`,

        // Replace this URL with your image URL
      }}
    >
      <h1 className="text-4xl font-bold text-fuchsia-500 mb-6">
        Events in Kolkata
      </h1>
      <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700">
        Hook me with Happenings!
      </button>
    </section>
  );
};

export default Hero;
