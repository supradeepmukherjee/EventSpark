import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Users from "./Users.jsx";
import Analytics from "./Analytics.jsx";
import Settings from "./Settings.jsx";
import ManageEvents from "./ManageEvents.jsx";

const Dashboard = () => (
  <div className="p-5 text-white">Welcome to the Dashboard</div>
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
          {section === "analytics" && <Analytics />}
          {section === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}
