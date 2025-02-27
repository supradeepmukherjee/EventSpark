import React, { useState } from "react";

const InvitationCardForm = () => {
  const [formData, setFormData] = useState({
    guestName: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    guestEmail: "",
    guestAddress: "",
    specialMessage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg mx-auto mt-10 border-4 border-amber-300 relative">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-4xl">
        👑
      </div>
      <h2 className="text-center text-3xl font-bold text-amber-700 mb-6 uppercase">
        Royal Invitation
      </h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Guest Name", name: "guestName", type: "text" },
          { label: "Event Name", name: "eventName", type: "text" },
          { label: "Date", name: "eventDate", type: "date" },
          { label: "Time", name: "eventTime", type: "time" },
          { label: "Location", name: "eventLocation", type: "text" },
          { label: "Guest Email", name: "guestEmail", type: "email" },
        ].map(({ label, name, type }) => (
          <div className="mt-4" key={name}>
            <label className="block font-semibold text-brown-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-3 mt-1 rounded-lg border-2 border-amber-300 focus:ring-2 focus:ring-amber-500"
            />
          </div>
        ))}

        <div className="mt-4">
          <label className="block font-semibold text-brown-700">
            Guest Home Address
          </label>
          <textarea
            name="guestAddress"
            rows="3"
            value={formData.guestAddress}
            onChange={handleChange}
            className="w-full p-3 mt-1 rounded-lg border-2 border-amber-300 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="mt-4">
          <label className="block font-semibold text-brown-700">
            Special Message
          </label>
          <textarea
            name="specialMessage"
            rows="3"
            value={formData.specialMessage}
            onChange={handleChange}
            className="w-full p-3 mt-1 rounded-lg border-2 border-amber-300 focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-amber-700 text-white rounded-lg hover:bg-amber-800 shadow-lg"
        >
          Send Invitation
        </button>
      </form>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-4xl">
        👑
      </div>
    </div>
  );
};

export default InvitationCardForm;
