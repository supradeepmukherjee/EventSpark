import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Users from "./Users.jsx";
import Analytics from "./Analytics.jsx";
import ManageEvents from "./ManageEvents.jsx";
import Services from "./Services.jsx";
import Payments from "./Payments.jsx";
import SupportQueries from "./SupportQueries.jsx"; // This will handle user queries

const Dashboard = () => (
  <div className="p-5 text-white">
    <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
    <Analytics /> {/* Analytics will be shown under Welcome to the Dashboard */}
  </div>
);

export default function AdminDashboard() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex h-screen">
      <Sidebar setSection={setSection} />
      <div className="flex-1">
        <Navbar />
        <div className="p-5">
          {section === "dashboard" && <Dashboard />}
          {section === "users" && <Users />}
          {section === "events" && <ManageEvents />}
          {section === "services" && <Services />}
          {section === "analytics" && <Analytics />}
          {section === "payments" && <Payments />}
          {section === "support" && <SupportQueries />}
        </div>
      </div>
    </div>
  );
}
