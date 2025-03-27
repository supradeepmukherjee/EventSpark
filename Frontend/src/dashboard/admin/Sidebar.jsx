import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { BarChart, Calendar } from "lucide-react";

const Sidebar = ({ setSection }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
      <ul>
        <li
          onClick={() => setSection("dashboard")}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
          <FiHome /> Dashboard
        </li>
        <li
          onClick={() => setSection("users")}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
          <FiUsers /> Users
        </li>
        <li
          onClick={() => setSection("events")}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
          <Calendar /> Manage Events
        </li>

        <li
          onClick={() => setSection("settings")}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 rounded"
        >
          <FiSettings /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
