import { useState, useEffect, useContext } from "react";
import { fetchSupportQueries, resolveSupportQuery } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const SupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const getQueries = async () => {
      try {
        const data = await fetchSupportQueries(user.token);
        setQueries(data.queries);
      } catch (error) {
        console.error("Error fetching support queries:", error);
      }
    };

    getQueries();
  }, [user.token]);

  const handleResolve = async (queryId) => {
    try {
      const adminFeedback = feedback[queryId] || "";
      if (!adminFeedback.trim()) {
        alert("Please provide feedback before submitting.");
        return;
      }
      await resolveSupportQuery(queryId, adminFeedback, user.token);

      const updatedQueries = await fetchSupportQueries(user.token);
      setQueries(updatedQueries.queries);

      setFeedback((prev) => {
        const updated = { ...prev };
        delete updated[queryId];
        return updated;
      });
    } catch (error) {
      console.error("Error resolving query:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        💬 Support & Queries
      </h2>
      <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-xs">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Message</th>
              <th className="p-4">Admin Feedback</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query, index) => (
              <tr
                key={query._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                } hover:bg-blue-800 transition duration-200`}
              >
                <td className="p-4 font-medium">{query.name}</td>
                <td className="p-4">{query.email}</td>
                <td className="p-4">{query.subject}</td>
                <td className="p-4">{query.msg}</td>
                <td className="p-4">
                  {query.isResolved ? (
                    <input
                      type="text"
                      value={query.reply}
                      disabled
                      className="border rounded p-2 w-48 bg-gray-500 text-gray-300 cursor-not-allowed"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Provide feedback..."
                      className="border rounded p-2 w-48 focus:ring-2 focus:ring-blue-300 outline-none bg-gray-700 text-white"
                      value={feedback[query._id] || ""}
                      onChange={(e) =>
                        setFeedback({
                          ...feedback,
                          [query._id]: e.target.value,
                        })
                      }
                    />
                  )}
                </td>
                <td className="p-4">
                  {!query.isResolved ? (
                    <button
                      onClick={() => handleResolve(query._id)}
                      className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                      Submit
                    </button>
                  ) : (
                    <span className="text-green-400 font-semibold">
                      ✅ Resolved
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {queries.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No support queries found.
        </p>
      )}
    </div>
  );
};

export default SupportQueries;
