import { useState, useEffect, useContext } from "react";
import { fetchSupportQueries, resolveSupportQuery } from "../api/api.js"; // API functions
import { AuthContext } from "../../context/AuthContext";

const SupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const { user } = useContext(AuthContext);
  const [feedback, setFeedback] = useState({}); // Store feedback for each query

  useEffect(() => {
    const getQueries = async () => {
      try {
        const data = await fetchSupportQueries(user.token);
        setQueries(data);
      } catch (error) {
        console.error("Error fetching support queries:", error);
      }
    };

    getQueries();
  }, [user.token]);

  const handleResolve = async (queryId) => {
    try {
      const adminFeedback = feedback[queryId] || "";
      await resolveSupportQuery(queryId, adminFeedback, user.token);
      setQueries(queries.filter((query) => query.id !== queryId));
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
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query.id} className="border-b text-center">
                <td className="p-3">{query.user}</td>
                <td className="p-3">{query.email}</td>
                <td className="p-3">{query.subject}</td>
                <td className="p-3">{query.message}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <input
                    type="text"
                    placeholder="Provide feedback..."
                    className="border rounded p-1 w-48"
                    value={feedback[query.id] || ""}
                    onChange={(e) =>
                      setFeedback({ ...feedback, [query.id]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleResolve(query.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Submit Feedback
                  </button>
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
