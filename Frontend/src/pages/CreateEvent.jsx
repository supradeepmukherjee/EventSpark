import React from "react";

const CreateEvent = () => {
  return (
    <div className="create-event max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Create Your Event</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          className="border p-2 rounded"
          required
        />
        <input type="date" className="border p-2 rounded" required />
        <input type="time" className="border p-2 rounded" required />
        <textarea
          placeholder="Event Description"
          rows="4"
          className="border p-2 rounded"
          required
        ></textarea>
        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
