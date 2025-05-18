import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const FoodAndDrinkForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cuisines: [],
    beverages: [],
    dietaryRestrictions: "",
    specialRequests: "",
  });

  const cuisineOptions = [
    "Buffet",
    "Plated Dinner",
    "Hors d’oeuvres",
    "Family Style",
    "Cocktail Reception",
    "Barbecue",
    "Food Stations",
    "Sit-Down Dinner",
    "Brunch",
    "Dessert Only",
  ];

  const beverageOptions = ["Non-Alcoholic", "Alcoholic"];

  const handleCheckboxChange = (name, value) => {
    setFormData((prevData) => {
      const currentValues = prevData[name];
      return {
        ...prevData,
        [name]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

if (formData.cuisines.length === 0) {
    toast.error("Please select at least one cuisine option.");
    return;
  }

  if (formData.beverages.length === 0) {
    toast.error("Please select a beverage preference.");
    return;
  }

  if (formData.beverages.length > 1) {
    toast.error("Please select only one beverage type: Alcoholic or Non-Alcoholic.");
    return;
  }

    if (!user) {
      alert("You must be logged in to submit catering details.");
      navigate("/sign-in");
      return;
    }

    toast.info("Submitting. Please Wait...");
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_SERVER + "/food",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.dismiss();
      if (data?.success) {
        toast.success("Catering Details Submitted Successfully!");
      } else {
        toast.error(data?.msg || "Submission failed!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(
        error?.response?.data?.msg || "Something went wrong. Please try again!"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-orange-500">
          Catering Service Form
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Cuisine Selection */}
          <div>
            <label className="block font-semibold">
              Preferred Cuisines / Meal Types *
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {cuisineOptions.map((cuisine) => (
                <label key={cuisine} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.cuisines.includes(cuisine)}
                    onChange={() => handleCheckboxChange("cuisines", cuisine)}
                  />
                  <span className="text-sm">{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Beverage Preferences */}
          <div>
            <label className="block font-semibold">
              Beverage Preferences *
            </label>
            <div className="flex gap-6 mt-2">
              {beverageOptions.map((beverage) => (
                <label key={beverage} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.beverages.includes(beverage)}
                    onChange={() => handleCheckboxChange("beverages", beverage)}
                  />
                  <span className="text-sm">{beverage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="block font-semibold">Dietary Restrictions</label>
            <textarea
              name="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
              placeholder="Mention if any (e.g., Vegetarian, Vegan, Gluten-Free)"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            />
          </div>

          {/* Special Requests */}
          <div>
            <label className="block font-semibold">
              Special Requests / Additional Services
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any specific arrangements, themes, or food requirements"
              className="w-full p-2 mt-1 border rounded-lg h-20"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodAndDrinkForm;
