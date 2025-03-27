import { useState, useEffect, useContext } from "react";
import { fetchPayments } from "../api/api.js"; // API function to get payments
import { AuthContext } from "../../context/AuthContext";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const data = await fetchPayments(user.token);
        console.log(data);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    getPayments();
  }, [user.token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Payments & Transactions
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">Transaction ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b text-center">
                <td className="p-3">{payment.transactionId}</td>
                <td className="p-3">{payment.user}</td>
                <td className="p-3 text-green-500 font-bold">
                  ₹{payment.amount}
                </td>
                <td className="p-3">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    payment.status === "Completed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
