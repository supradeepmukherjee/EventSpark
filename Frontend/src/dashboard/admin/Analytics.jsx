import { useState, useEffect, useContext } from "react";
import { fetchAnalyticsData } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAnalyticsData(user.token)
      .then(setAnalytics)
      .catch((err) => console.error("Error fetching analytics:", err));
  }, [user.token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Analytics Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold">Total Users</h3>
          <p className="text-2xl">{analytics.totalUsers}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold">Total Events</h3>
          <p className="text-2xl">{analytics.totalEvents}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-bold">Revenue</h3>
          <p className="text-2xl">${analytics.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
