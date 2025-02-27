import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export const Footer = () => {
  // Contact Numbers Array
  const contactNumbers = [
    "+919832995646",
    "+919547165753",
    "+917319147334",
    "+917029086141",
    "+917029125961",
  ];

  return (
    <footer className="py-16 px-[9%] bg-gray-900 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Branches Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Branches</h3>
          <p>Kolkata, Paschim Medinipur, Delhi, Purulia, Ghatal</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Services", "About", "Gallery"].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-blue-400"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact Info</h3>
          {contactNumbers.map((number, index) => (
            <p key={index} className="flex items-center gap-2">
              <FaPhone />
              <a href={`tel:${number}`} className="hover:text-blue-400">
                {number}
              </a>
            </p>
          ))}
          <p className="flex items-center gap-2 mt-2">
            <FaEnvelope />
            <a href="mailto:example@gmail.com" className="hover:text-blue-400">
              eventsparkteam@gmail.com
            </a>
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaTwitter />, link: "https://twitter.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-blue-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-gray-400">
        &copy; {new Date().getFullYear()} EventSpark. All Rights Reserved.
      </p>
    </footer>
  );
};
