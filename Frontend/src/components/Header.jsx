import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/sign-in");
  };

  return (
    <header className="bg-[#333] py-4 px-[9%] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          <span className="text-blue-500">Event</span>spark
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute sm:relative top-16 sm:top-0 left-0 w-full sm:w-auto bg-[#333] sm:bg-transparent p-6 sm:p-0 ${
            isOpen ? "block" : "hidden"
          } sm:flex`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Navigation Links */}
            {[
              { name: "Home", path: "/" },
              { name: "Service", path: "/service" },
              { name: "About Us", path: "/about-us" },
              { name: "Create Event", path: "/create-event" },
              { name: "Gallery", path: "/gallery" },
              { name: "Price", path: "/pricing" },
              { name: "Review", path: "/reviews" },
              { name: "Contact", path: "/contact" },
              { name: "Status", path: "/status" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-white hover:text-blue-500 transition-colors block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section (Right Side) */}
        <div className="relative">
          {user ? (
            <div
              className="flex items-center space-x-3 cursor-pointer relative"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUserCircle className="text-white text-2xl" />
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="text-white hover:text-blue-500 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Dropdown Menu (Only visible when clicked) */}
          {user && dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md text-gray-700">
              <div className="p-4 border-b">
                <p className="font-semibold">{user.name || "User"}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <Link
                to={
                  user.role === "User"
                    ? "/customer-dashboard"
                    : "/admin-dashboard"
                }
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </Link>

              <Link
                to="/change-password"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100  "
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
