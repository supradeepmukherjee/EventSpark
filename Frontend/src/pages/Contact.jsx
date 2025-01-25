import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-us text-center py-10">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <form className="max-w-md mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 border rounded-md"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          required
          className="w-full p-3 border rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
