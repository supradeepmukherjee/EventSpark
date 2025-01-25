import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 text-center w-64 h-64">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-lg mb-4 w-full h-32 object-cover"
      />
      <h3 className="text-lg font-semibold truncate">{event.title}</h3>
      <p className="text-gray-600 text-sm mt-2">Location: {event.location}</p>
      <p className="text-gray-600 text-sm">Date: {event.date}</p>
    </div>
  );
};

export default EventCard;
