import { useState, useEffect, useContext } from "react";
import { fetchEvents, fetchUsers, updateEventStatus } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const ManageEvents = () => {
  const [users, setUsers] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(user.token);
        setUsers(data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchEventsData = async () => {
      try {
        const data = await fetchEvents(user.token);
        setAllEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchData();
    fetchEventsData();
  }, [user.token]);

  const handleStatusChange = async (eventId, status) => {
    try {
      const response = await updateEventStatus(eventId, status, user.token, {
        status,
      });

      if (response.success) {
        const updatedEvents = await fetchEvents(user.token);
        setAllEvents(updatedEvents.events || []);
      } else {
        console.error("Failed to update status:", response.message);
      }
    } catch (err) {
      console.error("Error updating event status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Manage Events
      </h2>

      <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full bg-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Enrolled Events</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userEvents = allEvents.filter(
                (event) => event.user._id === user._id
              );

              return (
                <tr key={user._id} className="border-b hover:bg-gray-600">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {userEvents.length > 0 ? (
                      <table className="w-full border rounded-lg bg-gray-800">
                        <thead>
                          <tr className="bg-gray-600 text-white text-xs">
                            <th className="p-2">Event Name</th>
                            <th className="p-2">Venue</th>
                            <th className="p-2">Guests</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEvents.map((event) => (
                            <tr
                              key={event._id}
                              className="border-t hover:bg-gray-700"
                            >
                              <td className="p-2">{event.name}</td>
                              <td className="p-2">{event.venue}</td>
                              <td className="p-2">{event.numberOfGuests}</td>
                              <td
                                className={`p-2 font-semibold ${
                                  event.status === "Approved"
                                    ? "text-green-500"
                                    : event.status === "Rejected"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {event.status || "Pending"}
                              </td>
                              <td className="p-2">
                                <button
                                  onClick={() =>
                                    handleStatusChange(event._id, "Approved")
                                  }
                                  className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() =>
                                    handleStatusChange(event._id, "Rejected")
                                  }
                                  className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition ml-2"
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <span className="text-gray-400">No events enrolled</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
