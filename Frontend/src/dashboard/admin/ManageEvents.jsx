import { useState, useEffect, useContext } from "react";
import { fetchEvents, updateEventStatus } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const ManageEvents = () => {
  const [usersWithEvents, setUsersWithEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchEvents(user.token);

        // Group events by user
        const groupedByUser = eventsData.reduce((acc, event) => {
          const { organizerId, organizerName } = event;
          if (!acc[organizerId]) {
            acc[organizerId] = { organizerName, events: [] };
          }
          acc[organizerId].events.push(event);
          return acc;
        }, {});

        setUsersWithEvents(Object.entries(groupedByUser));
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchData();
  }, [user.token]);

  const handleStatusChange = async (eventId, status) => {
    try {
      await updateEventStatus(eventId, status, user.token);
      setUsersWithEvents((prevUsers) =>
        prevUsers.map(([userId, userObj]) => [
          userId,
          {
            ...userObj,
            events: userObj.events.map((event) =>
              event.id === eventId ? { ...event, status } : event
            ),
          },
        ])
      );
    } catch (err) {
      console.error("Error updating event status:", err);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Manage Events by Users
      </h2>

      <div className="space-y-6">
        {usersWithEvents.map(([userId, userObj]) => (
          <div key={userId} className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-bold text-gray-800">
              {userObj.organizerName}
            </h3>

            <table className="w-full mt-3 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">Event Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userObj.events.map((event) => (
                  <tr key={event.id} className="border-b text-gray-800">
                    <td className="p-3">{event.name}</td>
                    <td className="p-3">{event.date}</td>
                    <td
                      className={`p-3 font-semibold ${
                        event.status === "Approved"
                          ? "text-green-500"
                          : event.status === "Rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {event.status}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleStatusChange(event.id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(event.id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
