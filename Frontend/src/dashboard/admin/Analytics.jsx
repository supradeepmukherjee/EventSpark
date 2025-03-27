import { useState, useEffect, useContext } from "react";
import { fetchAnalyticsData } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";
import {
  FaUsers,
  FaCalendarCheck,
  FaRegClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPlayCircle,
} from "react-icons/fa";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalEvents: 0,
    activeEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
  });

  const { user } = useContext(AuthContext);
  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnalyticsData(user.token);
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchData();
  }, [user.token]); // Runs when user.token changes

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📊 Admin Analytics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaUsers className="text-4xl text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{analytics.totalUsers}</p>
          </div>
        </div>

        {/* Total Events */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaCalendarCheck className="text-4xl text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Events</h3>
            <p className="text-2xl font-bold">{analytics.totalEvents}</p>
          </div>
        </div>

        {/* Total Active Events */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaPlayCircle className="text-4xl text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Active Events</h3>
            <p className="text-2xl font-bold">{analytics.activeEvents}</p>
          </div>
        </div>

        {/* Pending Events */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaRegClock className="text-4xl text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold">Pending Events</h3>
            <p className="text-2xl font-bold">{analytics.pendingEvents}</p>
          </div>
        </div>

        {/* Approved Events */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaCheckCircle className="text-4xl text-green-400" />
          <div>
            <h3 className="text-lg font-semibold">Approved Events</h3>
            <p className="text-2xl font-bold">{analytics.approvedEvents}</p>
          </div>
        </div>

        {/* Rejected Events */}
        <div className="bg-gray-800 p-6 shadow-lg rounded-lg flex items-center gap-4">
          <FaTimesCircle className="text-4xl text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Rejected Events</h3>
            <p className="text-2xl font-bold">{analytics.rejectedEvents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
