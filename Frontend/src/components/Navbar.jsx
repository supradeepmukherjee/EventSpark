import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activePage, setActivePage] = useState(null);
  const handleClick = (page) => {
    setActivePage(page);
  };
  return (
    <header className="bg-white shadow-md">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="logo text-2xl font-bold text-blue-600">
          <Link to="/">Eventspark</Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center gap-4">
            {/* District Selector */}
            <li className="flex items-center">
              <span className="mr-2 text-gray-700">In</span>
              <select
                id="district-select"
                className="border border-gray-300 rounded-md p-2 text-gray-700"
              >
                <option value="kolkata">Kolkata</option>
                <option value="howrah">Howrah</option>
                <option value="darjeeling">Darjeeling</option>
                <option value="purulia">Purulia</option>
                <option value="midnapore">Midnapore</option>
              </select>
            </li>

            {/* Page Links */}
            <li>
              <Link
                to="/"
                onClick={() => handleClick("home")}
                className={` text-gray-700 hover:text-blue-500 ${
                  activePage === "home" ? "text-green-500" : ""
                } transition-colors `}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => handleClick("about")}
                className={`text-gray-700 hover:text-blue-500 ${
                  activePage === "about" ? "text-green-500" : ""
                } transition-colors`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                onClick={() => handleClick("contact")}
                className={`text-gray-700 hover:text-blue-500 ${
                  activePage === "contact" ? "text-green-500" : ""
                } transition-colors`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/create-event"
                onClick={() => handleClick("create")}
                className={`text-gray-700 hover:text-blue-500 ${
                  activePage === "create" ? "text-green-500" : ""
                } transition-colors`}
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                to="/browse-events"
                onClick={() => handleClick("browse")}
                className={`text-gray-700 hover:text-blue-500 ${
                  activePage === "browse" ? "text-green-500" : ""
                } transition-colors`}
              >
                Browse Event
              </Link>
            </li>

            {/* Auth Buttons */}
            <li>
              <Link
                to="/sign-in"
                onClick={() => handleClick(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                onClick={() => handleClick(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
