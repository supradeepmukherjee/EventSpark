import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messageVisible, setMessageVisible] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    start: "",
    end: "",
    numberOfGuests: "",
    services: [],
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (e) => {
    const { checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((service) => service !== value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("You must be logged in to create an event.");
      setError("You must be logged in to create an event.");
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
      return;
    }

    setMessageVisible(false);
    setError("");

    const eventDetails = {
      ...formData,
      numberOfGuests: parseInt(formData.numberOfGuests, 10),
      user: user._id,
    };

    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      setMessageVisible(true);
      setFormData({
        name: "",
        venue: "",
        start: "",
        end: "",
        numberOfGuests: "",
        services: [],
        additionalInfo: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-4">
          Event Creation Form
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">Name of the Event:</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select an Event
            </option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday Party">Birthday Party</option>
            <option value="Corporate Meeting">Corporate Meeting</option>
            <option value="Conference">Conference</option>
            <option value="Concert">Concert</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Workshop">Workshop</option>
            <option value="Festival Celebration">Festival Celebration</option>
          </select>

          <label className="block">Venue:</label>
          <select
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Venue</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Midnapore">Midnapore</option>
            <option value="Contai">Contai</option>
            <option value="Hooghly">Hooghly</option>
            <option value="Purulia">Purulia</option>
            <option value="Darjeeling">Darjeeling</option>
            <option value="Other">Other</option>
          </select>

          {formData.venue === "Other" && (
            <input
              type="text"
              name="customVenue"
              value={formData.customVenue || ""}
              onChange={handleChange}
              placeholder="Enter Custom Venue"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          <label className="block">Starting Date:</label>
          <input
            type="date"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
            min={new Date().toISOString().split("T")[0]} // Prevents past dates
            pattern="\d{4}-\d{2}-\d{2}" // Ensures YYYY-MM-DD format
            placeholder="YYYY-MM-DD"
          />

          <label className="block">Ending Date:</label>
          <input
            type="date"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
            min={formData.start || new Date().toISOString().split("T")[0]} // Prevents selection before the start date
            pattern="\d{4}-\d{2}-\d{2}" // Ensures YYYY-MM-DD format
            placeholder="YYYY-MM-DD"
          />

          <label className="block">Number of Guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            placeholder="Enter Number of Guests"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
            min="1"
            max="1000"
          />

          <label className="block">Required Services:</label>
          <div className="flex flex-wrap gap-3">
            {["Catering", "Decoration", "Music", "Lighting"].map(
              (service, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleServiceChange}
                    className="form-checkbox text-blue-500"
                  />
                  <span>{service}</span>
                </label>
              )
            )}
          </div>

          <label className="block">Additional Information:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Enter any additional details"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>

        {messageVisible && (
          <p className="mt-4 text-lg font-semibold text-blue-500 text-center">
            Your event has been created successfully.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
