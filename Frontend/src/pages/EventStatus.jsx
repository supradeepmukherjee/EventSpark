import { useState } from "react";

const EventStatus = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessageVisible(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          Track Your Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name of the Customer"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Name of the Event"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Event ID"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-gray-400 text-black py-2 rounded-md hover:bg-gray-600 transition"
          >
            Back
          </button>
        </form>

        {messageVisible && (
          <p className="mt-4 text-lg font-semibold text-blue-500">
            Your order is in progress.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventStatus;
