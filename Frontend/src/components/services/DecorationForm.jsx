import React, { useState } from "react";

const DecorationForm = () => {
  const [formData, setFormData] = useState({
    theme: "classic",
    color: "",
    flowers: "",
    extras: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Decoration Form Data:", formData);
    // Add form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-pink-600">
          Decoration Form
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold">Decoration Theme:</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="rustic">Rustic</option>
              <option value="beach">Beach</option>
              <option value="bohemian">Bohemian</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">
              Preferred Color Scheme:
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. White and Gold"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold">Flower Arrangements:</label>
            <input
              type="text"
              name="flowers"
              value={formData.flowers}
              onChange={handleChange}
              placeholder="e.g. Roses, Lilies"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold">Additional Requests:</label>
            <textarea
              name="extras"
              value={formData.extras}
              onChange={handleChange}
              placeholder="Any special decorations or requirements"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DecorationForm;
