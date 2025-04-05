import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const FoodAndDrinkForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    guests: "",
    date: "",
    time: "",
    location: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to fill up Food & Drink Form.");
      navigate("/sign-in");
      return;
    }

    console.log(formData);
    toast.info('Submitting. Please Wait')
    try {
      const { data } = await axios.post(import.meta.env.VITE_SERVER + "/food",
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      console.log(data)
      toast.dismiss()
      if (data?.success) toast.success('Details Submitted Successfully')
      else {
        if (data?.msg) toast.error(data?.msg)
      }

    } catch (error) {
      toast.dismiss()
      toast.error("Something went wrong. Please try again!");
    } 
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">
        Event Catering Request Form
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mt-4">Name of the Event *</label>

        <label className="block font-semibold mt-4">Number of Guests *</label>
        <input
          type="number"
          name="guests"
          className="w-full p-2 border rounded-lg mt-2"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mt-4">Date *</label>
        <input
          type="datetime-local"
          name="date"
          className="w-full p-2 border rounded-lg mt-2"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mt-4">Starting Time *</label>
        <input
          type="datetime-local"
          name="time"
          className="w-full p-2 border rounded-lg mt-2"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mt-4">Location *</label>
        <input
          type="text"
          name="location"
          className="w-full p-2 border rounded-lg mt-2"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mt-4">
          Preferred Cuisine or Meal Type *
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {cuisineOptions.map((cuisine) => (
            <label key={cuisine} className="flex items-center gap-2 w-1/2">
              <input
                type="checkbox"
                checked={formData.cuisines.includes(cuisine)}
                onChange={() => handleCheckboxChange("cuisines", cuisine)}
              />
              {cuisine}
            </label>
          ))}
        </div>

        <label className="block font-semibold mt-4">
          Beverage Preferences *
        </label>
        <div className="flex gap-4 mt-2">
          {beverageOptions.map((beverage) => (
            <label key={beverage} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.beverages.includes(beverage)}
                onChange={() => handleCheckboxChange("beverages", beverage)}
              />
              {beverage}
            </label>
          ))}
        </div>

        <label className="block font-semibold mt-4">
          Dietary Restrictions *
        </label>
        <textarea
          name="dietaryRestrictions"
          className="w-full p-2 border rounded-lg mt-2"
          rows="3"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          required
        />

        <label className="block font-semibold mt-4">
          Special Requests or Additional Services *
        </label>
        <textarea
          name="specialRequests"
          className="w-full p-2 border rounded-lg mt-2"
          rows="3"
          value={formData.specialRequests}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg mt-6 hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
      </div>
  );
};

export default FoodAndDrinkForm;
