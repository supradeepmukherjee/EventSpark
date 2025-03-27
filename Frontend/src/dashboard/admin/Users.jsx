import { useState, useEffect, useContext } from "react";
import { fetchUsers } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

    fetchData();
  }, [user.token]);

  // Filter users based on search input
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">
        All Registered Users
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-blue-400 w-80"
        />
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-gray-800">
                {user.name}
              </h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg col-span-full">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
