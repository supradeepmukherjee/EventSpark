import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'

const themeData = {
  classic: [
    { image: "/images/decoration/1.jpg", budget: "₹500" },
    { image: "/images/decoration/2.jpg", budget: "₹600" },
    { image: "/images/decoration/3.jpg", budget: "₹700" },
  ],
  modern: [
    { image: "/images/decoration/4.jpg", budget: "₹800" },
    { image: "/images/decoration/5.jpg", budget: "₹900" },
    { image: "/images/decoration/6.jpg", budget: "₹1000" },
  ],
  rustic: [
    { image: "/images/decoration/7.jpg", budget: "₹700" },
    { image: "/images/decoration/8.jpg", budget: "₹750" },
    { image: "/images/decoration/9.jpg", budget: "₹800" },
  ],
  beach: [
    { image: "/images/decoration/10.jpg", budget: "₹850" },
    { image: "/images/decoration/11.jpg", budget: "₹900" },
    { image: "/images/decoration/12.jpg", budget: "₹950" },
  ],
  bohemian: [
    { image: "/images/decoration/13.jpg", budget: "₹600" },
    { image: "/images/decoration/14.jpg", budget: "₹650" },
    { image: "/images/decoration/15.jpg", budget: "₹700" },
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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const { id } = useParams();
  const [event, setEvent] = useState('')

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
    if (!user) {
      alert("You must be logged in to proceed further");
      navigate("/sign-in");
      return;
    }

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
      event,
      theme: formData.theme,
      color: formData.color,
      flowers: formData.flowers,
      extras: formData.extras,
      selectedImage: formData.selectedImage,
      selectedBudget: formData.selectedBudget,
    };

    console.log("Final Submitted Data:", finalData); // Debugging

    toast.info('Submitting. Please Wait')
    try {
      // const { data } = await axios.post(import.meta.env.VITE_SERVER + "/decoration",
      //   finalData,
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //     withCredentials: true
      //   })
      const data = { success: true }
      console.log(data)
      toast.dismiss()
      if (data?.success) toast.success('Details Submitted Successfully')
      else {
        if (data?.msg) toast.error(data?.msg)
      }

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
      toast.dismiss()
      toast.error("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    const f = async () => {
      const { data } = await axios.get(import.meta.env.VITE_SERVER + "/event/by-account", { withCredentials: true })
      setEvent(data?.event)
    }
    f()
  }, [])

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
                className={`border-2 rounded-lg cursor-pointer p-2 ${formData.selectedImage === item.image
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
                {/* <p className="text-center mt-2 font-semibold text-gray-700">
                  Budget: {item.budget}
                </p> */}
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
      <ToastContainer />
    </div>
  );
};

export default DecorationForm;
