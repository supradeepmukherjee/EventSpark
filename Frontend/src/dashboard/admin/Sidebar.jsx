import { FiHome, FiUsers, FiDollarSign, FiMessageCircle } from "react-icons/fi";
import { BarChart, Calendar, Settings } from "lucide-react"; // 🛠️ Added Settings icon

const Sidebar = ({ setSection }) => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
      <ul className="space-y-2">
        <li
          onClick={() => setSection("dashboard")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <FiHome size={20} /> <span className="text-sm">Dashboard</span>
        </li>
        <li
          onClick={() => setSection("users")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <FiUsers size={20} /> <span className="text-sm">Users</span>
        </li>
        <li
          onClick={() => setSection("events")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <Calendar size={20} /> <span className="text-sm">Manage Events</span>
        </li>
        <li
          onClick={() => setSection("services")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <Settings size={20} /> <span className="text-sm">Services</span>
        </li>
        <li
          onClick={() => setSection("payments")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <FiDollarSign size={20} />{" "}
          <span className="text-sm">Payments & Transactions</span>
        </li>
        <li
          onClick={() => setSection("support")}
          className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-700 rounded-lg transition"
        >
          <FiMessageCircle size={20} />{" "}
          <span className="text-sm">Support & Queries</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
