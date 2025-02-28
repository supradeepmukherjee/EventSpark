<<<<<<< HEAD
=======
import React, { useState } from "react";
>>>>>>> 712c51b41d97d9ff335e14893975b60a9b64d8b6
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

<<<<<<< HEAD
const Header = () => (
  <header className="bg-[#333] py-4 px-[9%] shadow-md">
    <div className="container mx-auto px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        <span className="text-blue-500">Event</span>spark
      </h1>
      <nav>
        <ul className="flex space-x-6">
          {[
            { name: "Home", path: "/" },
            { name: "Service", path: "/service" },
            { name: "About Us", path: "/about-us" },
            { name: "Create Event", path: "/create-event" },
            { name: "Gallery", path: "/gallery" },
            { name: "Price", path: "/pricing" },
            { name: "Review", path: "/reviews" },
            { name: "Contact", path: "/contact" },
            { name: "Sign In", path: "/sign-in" },
            { name: "Status", path: "/status" },
          ].map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-white hover:text-blue-500 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);
=======
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            {[
              { name: "Home", path: "/" },
              { name: "Service", path: "/service" },
              { name: "About Us", path: "/about-us" },
              { name: "Create Event", path: "/create-event" },
              { name: "Gallery", path: "/gallery" },
              { name: "Price", path: "/pricing" },
              { name: "Review", path: "/reviews" },
              { name: "Contact", path: "/contact" },
              { name: "Sign In", path: "/sign-in" },
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
      </div>
    </header>
  );
};
>>>>>>> 712c51b41d97d9ff335e14893975b60a9b64d8b6

export default Header;
