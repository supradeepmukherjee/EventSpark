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
        console.log(data.users);
        setUsers(data.users || []); // Ensure users array exists
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    const fetchEventsData = async () => {
      try {
        const data = await fetchEvents(user.token);
        console.log(data.events);
        setAllEvents(data.events || []); // Ensure events array exists
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchData();
    fetchEventsData();
  }, [user.token]);

  const handleStatusChange = async (eventId, status) => {
    try {
      // Call API to update event status
      const response = await updateEventStatus(eventId, status, user.token, {
        status,
      });

      console.log(response);

      if (response.success) {
        // Fetch updated events from backend to reflect changes
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
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Manage Users & Events
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Enrolled Events</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              // 🔹 Filter events for this specific user
              const userEvents = allEvents.filter(
                (event) => event.user._id === user._id
              );

              return (
                <tr key={user._id} className="border-b">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {userEvents.length > 0 ? (
                      <table className="w-full border rounded-lg">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700 text-left">
                            <th className="p-2">Event Name</th>
                            <th className="p-2">Venue</th>
                            <th className="p-2">Guests</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEvents.map((event) => (
                            <tr key={event._id} className="border-t">
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
                                  className="bg-green-500 cursor-pointer text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600"
                                >
                                  Approve
                                </button>

                                <button
                                  onClick={() =>
                                    handleStatusChange(event._id, "Rejected")
                                  }
                                  className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <span className="text-gray-500">No events enrolled</span>
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
