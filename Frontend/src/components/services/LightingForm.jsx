import { useState } from "react";

const LightingForm = () => {
  const [formData, setFormData] = useState({
    lightingType: "led",
    color: "",
    intensity: "",
    extras: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lighting Form Data:", formData);
    // Add form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-orange-500">
          Lighting Decoration Form
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block font-semibold">Lighting Type:</label>
            <select
              name="lightingType"
              value={formData.lightingType}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg"
            >
              <option value="led">LED</option>
              <option value="fairy">Fairy Lights</option>
              <option value="chandeliers">Chandeliers</option>
              <option value="neon">Neon Lights</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">
              Preferred Light Color:
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g. Warm White, Blue"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Light Intensity (in lumens):
            </label>
            <input
              type="number"
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Additional Requirements:
            </label>
            <textarea
              name="extras"
              value={formData.extras}
              onChange={handleChange}
              placeholder="Any special lighting effects or needs"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LightingForm;
