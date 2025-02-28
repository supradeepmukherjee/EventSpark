import { useState } from "react";

const VenueSelectionForm = () => {
  const [formData, setFormData] = useState({
    eventType: "birthday",
    venue: "",
    capacity: "",
    date: "",
    extras: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold text-green-600 mb-6">
        Venue Selection Form
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mt-4">Event Type:</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mt-1"
        >
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="conference">Conference</option>
          <option value="other">Other</option>
        </select>

        <label className="block font-medium mt-4">Preferred Venue:</label>
        <input
          type="text"
          name="venue"
          placeholder="Enter venue name or type"
          value={formData.venue}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mt-1"
        />

        <label className="block font-medium mt-4">Expected Guest Count:</label>
        <input
          type="number"
          name="capacity"
          placeholder="e.g. 100"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mt-1"
        />

        <label className="block font-medium mt-4">Event Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mt-1"
        />

        <label className="block font-medium mt-4">
          Additional Requirements:
        </label>
        <textarea
          name="extras"
          placeholder="Any special requests or requirements"
          value={formData.extras}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg mt-1"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 mt-6 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VenueSelectionForm;
