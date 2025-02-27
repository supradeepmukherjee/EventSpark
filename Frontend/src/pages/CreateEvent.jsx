import { useState } from "react";

const CreateEvent = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessageVisible(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-4">
          Event Creation Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">Name of the Event:</label>
          <input
            type="text"
            placeholder="Enter Event Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block">Venue:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Venue</option>
            <option value="Hall A">Hall A</option>
            <option value="Hall B">Hall B</option>
            <option value="Garden Area">Garden Area</option>
            <option value="Banquet Hall">Banquet Hall</option>
          </select>

          <label className="block">Starting Date:</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block">Ending Date:</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block">Number of Guests:</label>
          <input
            type="number"
            placeholder="Enter Number of Guests"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block">Required Services:</label>
          <div className="flex flex-wrap gap-3">
            {["Catering", "Decoration", "Music", "Lighting"].map(
              (service, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span>{service}</span>
                </label>
              )
            )}
          </div>

          <label className="block">Additional Information:</label>
          <textarea
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
