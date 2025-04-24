import React, { useState, useEffect } from "react";

const MyEvents = () => {
  const [eventEnrollments, setEventEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/event/by-account`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const events = Array.isArray(data.event) ? data.event : [data.event];
        setEventEnrollments(events);

        // Removed: setting message about active events
      } catch (error) {
        console.error("Error fetching event data:", error);
        setMessage("Error loading your events.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="p-4">
      <h3 className="text-xl font-bold text-gray-700 mb-4">My Events</h3>

      {message && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Start</th>
              <th className="p-3 text-left">End</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Services</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Loading events...
                </td>
              </tr>
            ) : eventEnrollments.length ? (
              eventEnrollments.map((event, idx) => (
                <tr
                  key={event._id || idx}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{event.name}</td>
                  <td className="p-3">{event.venue}</td>
                  <td className="p-3">
                    {new Date(event.start).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(event.end).toLocaleDateString()}
                  </td>
                  <td className="p-3">{event.numberOfGuests}</td>
                  <td className="p-3">{event.services?.join(", ") || "N/A"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        event.status === "Approved"
                          ? "bg-green-500"
                          : event.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {event.status === "Approved" &&
                      event.paymentInfo?.status === "Pending" && (
                        <button
                          className="bg-blue-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-600 transition"
                          onClick={() =>
                            alert(`Proceed to payment for ${event.name}`)
                          }
                        >
                          Pay Now
                        </button>
                      )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No event enrollments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyEvents;
