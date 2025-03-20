import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";

const OrganizerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [formSubmissions, setFormSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("https://your-backend-api.com/forms");
        const data = await response.json();
        setFormSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`https://your-backend-api.com/forms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      setFormSubmissions((prevSubmissions) =>
        prevSubmissions.map((form) =>
          form.id === id ? { ...form, status } : form
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#333] text-white p-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-gray-200"
        >
          <FaHome className="text-2xl" />
          <span className="text-lg font-semibold">Home</span>
        </Link>
        <h1 className="text-2xl font-bold">Organizer Dashboard</h1>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl" />
          <span className="text-lg font-semibold">{user?.name}</span>
        </div>
      </header>

      {/* Table Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          All Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Form Type</th>
                <th className="p-3 text-left">Submission Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {formSubmissions.length > 0 ? (
                formSubmissions.map((form, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 flex items-center space-x-2">
                      <FaUserCircle className="text-xl" />
                      <span>{form.customerName}</span>
                    </td>
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
                    <td className="p-3">
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
                        onClick={() => handleStatusChange(form.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleStatusChange(form.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
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

export default OrganizerDashboard;
