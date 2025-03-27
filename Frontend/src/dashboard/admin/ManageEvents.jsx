import { useState, useEffect, useContext } from "react";
import { fetchEvents, updateEventStatus } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents(user.token)
      .then(setEvents)
      .catch((err) => console.error("Error fetching events:", err));
  }, [user.token]);

  const handleStatusChange = (eventId, status) => {
    updateEventStatus(eventId, status, user.token).then(() => {
      setEvents(
        events.map((event) =>
          event.id === eventId ? { ...event, status } : event
        )
      );
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">Manage Events</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3">Event Name</th>
            <th className="p-3">Organizer</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b">
              <td className="p-3">{event.name}</td>
              <td className="p-3">{event.organizer}</td>
              <td className="p-3">{event.date}</td>
              <td className="p-3">{event.status}</td>
              <td className="p-3">
                <button
                  onClick={() => handleStatusChange(event.id, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(event.id, "Rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
