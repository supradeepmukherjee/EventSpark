import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events booked by the customer (dummy data for now)
    setEvents([
      {
        id: 1,
        name: "Wedding Reception",
        venue: "Banquet Hall",
        date: "2025-04-15",
      },
      { id: 2, name: "Corporate Meeting", venue: "Hall A", date: "2025-05-20" },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        Customer Dashboard
      </h1>

      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => navigate("/create-event")}
      >
        Create New Event
      </button>

      <h2 className="text-xl font-semibold mb-2">Your Booked Events</h2>
      <ul className="w-full max-w-md bg-white p-4 shadow-md rounded-md">
        {events.length === 0 ? (
          <p className="text-gray-500 text-center">No events booked yet.</p>
        ) : (
          events.map((event) => (
            <li key={event.id} className="border-b p-2">
              <p className="font-semibold">{event.name}</p>
              <p className="text-sm text-gray-500">
                {event.venue} - {event.date}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CustomerDashboard;
