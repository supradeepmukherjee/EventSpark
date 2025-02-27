import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
};

export default Header;
