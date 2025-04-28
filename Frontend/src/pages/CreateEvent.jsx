import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import createEventImg from "/images/create-event.jpg";

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messageVisible, setMessageVisible] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    setMessageVisible(false);
    setError("");

    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Authentication failed. Please log in again.");
      navigate("/sign-in");
      return;
    }

    const eventDetails = {
      ...formData,
      numberOfGuests: parseInt(formData.numberOfGuests, 10) || 0,
    };

    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventDetails),
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok || data.success === false) {
        // handle specific server response about multiple events
        const errorMsg = data.msg || "Failed to create event";
        throw new Error(errorMsg);
      }

      // Only if success is true
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
      setError(error.message || "Something went wrong. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left - Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={createEventImg}
            alt="Event"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Form */}
        <div className="md:w-1/2 p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Create Your Event
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Event Name</label>
              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
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
                <option value="Festival Celebration">
                  Festival Celebration
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Venue</label>
              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Venue</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Midnapore">Midnapore</option>
                <option value="Contai">Contai</option>
                <option value="Hooghly">Hooghly</option>
                <option value="Purulia">Purulia</option>
                <option value="Darjeeling">Darjeeling</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Start Date</label>
                <input
                  type="date"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  required
                  min={
                    new Date(Date.now() + 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">End Date</label>
                <input
                  type="date"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                  required
                  min={formData.start || new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Number of Guests</label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                placeholder="Enter number of guests"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                required
                min="1"
                max="1000"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Required Services
              </label>
              <div className="flex flex-wrap gap-4">
                {["Catering", "Decoration", "Music", "Lighting"].map(
                  (service, index) => (
                    <label key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={handleServiceChange}
                        className="form-checkbox text-purple-600"
                      />
                      <span>{service}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Additional Info</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Enter any additional details"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md cursor-pointer transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>

          {messageVisible && (
            <div className="mt-6 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="mt-4 text-xl font-semibold text-green-700">
                Your event has been created successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
