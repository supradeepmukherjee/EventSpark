import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import MyEvents from "./MyEvents";
import AdminFeedback from "./AdminFeedback";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      {/* Header */}
      <header className="bg-blue-800 text-white p-4 flex justify-between items-center shadow">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <FaHome className="text-2xl" />
          <span className="font-semibold">Home</span>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Customer Dashboard</h1>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <span className="text-lg font-semibold">{user?.name}</span>
        </div>
      </header>

      {/* Content */}
      <div className="p-6 space-y-10 max-w-6xl mx-auto">
        {/* Greeting */}
        <div className="bg-white rounded-lg p-6 shadow text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Here’s an overview of your activity with EventSpark.
          </p>
        </div>

        {/* My Events Section */}
        <MyEvents />

        {/* Admin Feedback Section */}
        <AdminFeedback />
      </div>
    </div>
  );
};

export default CustomerDashboard;
