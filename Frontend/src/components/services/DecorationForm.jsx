import React, { useState } from "react";

const themeData = {
  classic: [
    { image: "https://your-image-url.com/classic1.jpg", budget: "$500" },
    { image: "https://your-image-url.com/classic2.jpg", budget: "$600" },
    { image: "https://your-image-url.com/classic3.jpg", budget: "$700" },
  ],
  modern: [
    { image: "https://your-image-url.com/modern1.jpg", budget: "$800" },
    { image: "https://your-image-url.com/modern2.jpg", budget: "$900" },
    { image: "https://your-image-url.com/modern3.jpg", budget: "$1000" },
  ],
  rustic: [
    { image: "https://your-image-url.com/rustic1.jpg", budget: "$700" },
    { image: "https://your-image-url.com/rustic2.jpg", budget: "$750" },
    { image: "https://your-image-url.com/rustic3.jpg", budget: "$800" },
  ],
  beach: [
    { image: "https://your-image-url.com/beach1.jpg", budget: "$850" },
    { image: "https://your-image-url.com/beach2.jpg", budget: "$900" },
    { image: "https://your-image-url.com/beach3.jpg", budget: "$950" },
  ],
  bohemian: [
    { image: "https://your-image-url.com/bohemian1.jpg", budget: "$600" },
    { image: "https://your-image-url.com/bohemian2.jpg", budget: "$650" },
    { image: "https://your-image-url.com/bohemian3.jpg", budget: "$700" },
  ],
};

const colorOptions = [
  "White and Gold",
  "Red and Black",
  "Blue and Silver",
  "Pink and White",
  "Green and Beige",
];
const flowerOptions = ["Roses", "Lilies", "Orchids", "Tulips", "Sunflowers"];

const DecorationForm = () => {
  const [formData, setFormData] = useState({
    theme: "classic",
    color: "",
    flowers: [],
    extras: "",
    selectedImage: "",
    selectedBudget: "",
  });

  const [showPreviews, setShowPreviews] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFlowerChange = (e) => {
    const selectedFlowers = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, flowers: selectedFlowers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreviews(true);
  };

  // Final Submit Function
  const handleFinalSubmit = async () => {
    if (!formData.selectedImage) {
      alert("Please select a preview before submitting.");
      return;
    }

    // Creating the final data object
    const finalData = {
      theme: formData.theme,
      color: formData.color,
      flowers: formData.flowers,
      extras: formData.extras,
      selectedImage: formData.selectedImage,
      selectedBudget: formData.selectedBudget,
    };

    console.log("Final Submitted Data:", finalData); // Debugging

    try {
      const response = await fetch(
        "https://your-backend-api.com/submit-decoration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      const result = await response.json();
      alert("Submission Successful! 🎉");

      // Reset form after submission
      setFormData({
        theme: "classic",
        color: "",
        flowers: [],
        extras: "",
        selectedImage: "",
        selectedBudget: "",
      });

      setShowPreviews(false); // Go back to the form
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {!showPreviews ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-pink-600">
            Decoration Form
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Decoration Theme */}
            <div>
              <label className="block font-semibold">Decoration Theme:</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-lg"
              >
                {Object.keys(themeData).map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Color Scheme */}
            <div>
              <label className="block font-semibold">
                Preferred Color Scheme:
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-lg"
              >
                <option value="">Select a color scheme</option>
                {colorOptions.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Flower Arrangements */}
            <div>
              <label className="block font-semibold">
                Flower Arrangements:
              </label>
              <select
                multiple
                name="flowers"
                value={formData.flowers}
                onChange={handleFlowerChange}
                className="w-full p-2 mt-1 border rounded-lg"
              >
                {flowerOptions.map((flower, index) => (
                  <option key={index} value={flower}>
                    {flower}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Hold Ctrl (Windows) or Command (Mac) to select multiple.
              </p>
            </div>

            {/* Additional Requests */}
            <div>
              <label className="block font-semibold">
                Additional Requests:
              </label>
              <textarea
                name="extras"
                value={formData.extras}
                onChange={handleChange}
                placeholder="Any special decorations or requirements"
                className="w-full p-2 mt-1 border rounded-lg h-20"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              Show Previews
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h3 className="text-center text-lg font-bold text-gray-700">
            Select Your Preferred Decoration
          </h3>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {themeData[formData.theme].map((item, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg cursor-pointer p-2 ${
                  formData.selectedImage === item.image
                    ? "border-pink-600"
                    : "border-gray-300"
                }`}
                onClick={() =>
                  setFormData({
                    ...formData,
                    selectedImage: item.image,
                    selectedBudget: item.budget,
                  })
                }
              >
                <img
                  src={item.image}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
                <p className="text-center mt-2 font-semibold text-gray-700">
                  Budget: {item.budget}
                </p>
              </div>
            ))}
          </div>

          {/* Submit Final Selection */}
          <button
            type="submit"
            onClick={handleFinalSubmit}
            className="w-full mt-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Submit Final Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default DecorationForm;
