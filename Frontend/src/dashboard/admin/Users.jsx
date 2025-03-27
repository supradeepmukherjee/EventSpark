import { useState, useEffect, useContext } from "react";
import { fetchUsers, updateEventStatus } from "../api/api.js"; // Function to update status
import { AuthContext } from "../../context/AuthContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(user.token);
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchData();
  }, [user.token]);

  const handleStatusChange = async (userId, eventId, status) => {
    try {
      await updateEventStatus(user.token, userId, eventId, status);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId
            ? {
                ...u,
                events: u.events.map((e) =>
                  e.id === eventId ? { ...e, status } : e
                ),
              }
            : u
        )
      );
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
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {user.events.length > 0 ? (
                    <table className="w-full border rounded-lg">
                      <thead>
                        <tr className="bg-gray-200 text-gray-700 text-left">
                          <th className="p-2">Event Name</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.events.map((event) => (
                          <tr key={event.id} className="border-t">
                            <td className="p-2">{event.name}</td>
                            <td
                              className={`p-2 font-semibold ${
                                event.status === "Approved"
                                  ? "text-green-500"
                                  : event.status === "Rejected"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {event.status}
                            </td>
                            <td className="p-2">
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    user.id,
                                    event.id,
                                    "Approved"
                                  )
                                }
                                className="bg-green-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-green-600"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    user.id,
                                    event.id,
                                    "Rejected"
                                  )
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
