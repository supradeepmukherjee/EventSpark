import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";

const CustomerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [formSubmissions, setFormSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `https://your-backend-api.com/forms?userId=${user.id}`
        );
        const data = await response.json();
        setFormSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#333] text-white p-4 flex justify-between items-center">
        {/* Left Section: Home Button */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-gray-200"
        >
          <FaHome className="text-2xl" />
          <span className="text-lg font-semibold">Home</span>
        </Link>

        {/* Center: Dashboard Title */}
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>

        {/* Right Section: Profile Icon & User Name */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <span className="text-lg font-semibold">{user?.name}</span>
        </div>
      </header>

      {/* Table Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          My Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Form Type</th>
                <th className="p-3 text-left">Submission Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.length > 0 ? (
                formSubmissions.map((form, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{form.type}</td>
                    <td className="p-3">
                      {new Date(form.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded ${
                          form.status === "Approved"
                            ? "bg-green-500 text-white"
                            : form.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {form.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
