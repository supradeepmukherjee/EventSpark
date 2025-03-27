import { useState, useEffect, useContext } from "react";
import { fetchUsers } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers(user.token)
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, [user.token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">Manage Users</h2>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
