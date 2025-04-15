import { useState, useEffect, useContext } from "react";
import { fetchSupportQueries, resolveSupportQuery } from "../api/api.js";
import { AuthContext } from "../../context/AuthContext";

const SupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({});

  useEffect(
    () => {
      const getQueries = async () => {
        try {
          const data = await fetchSupportQueries(user.token);
          setQueries(data.queries);
        } catch (error) {
          console.error("Error fetching support queries:", error);
        }
      };

      getQueries();
    },
    [user.token],
    feedback
  );

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
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Support & Queries
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Message</th>
              <th className="p-3">Admin Feedback</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query._id} className="border-b text-center">
                <td className="p-3">{query.name}</td>
                <td className="p-3">{query.email}</td>
                <td className="p-3">{query.subject}</td>
                <td className="p-3">{query.msg}</td>
                <td className="p-3">
                  {query.isResolved ? (
                    <input
                      type="text"
                      value={query.adminFeedback}
                      disabled
                      className="border rounded p-1 w-48 bg-gray-100 text-gray-700"
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Provide feedback..."
                      className="border rounded p-1 w-48"
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
                <td className="p-3">
                  {!query.isResolved && (
                    <button
                      onClick={() => handleResolve(query._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Submit Feedback
                    </button>
                  )}
                  {query.isResolved && (
                    <span className="text-green-600 font-medium">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportQueries;
