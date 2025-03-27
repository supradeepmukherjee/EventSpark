import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token from storage
    setUser(null); // Clear user context
    navigate("/sign-in"); // Redirect to login page
  };

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-bold">Admin Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {user?.name || "Admin"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded cursor-pointer hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
