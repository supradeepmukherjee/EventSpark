import React, { useState } from "react";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    msg: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a 10-digit phone number.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.msg.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const token = localStorage.getItem("userToken");

    try {
      // Replace this URL with your backend endpoint
      const res = await fetch(import.meta.env.VITE_SERVER + "/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log(res);
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          msg: "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="contact">
      <h1 className="text-3xl font-bold text-center mb-8">
        Contact <span className="text-blue-500">Us</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
            {errors.subject && (
              <p className="text-red-400 text-sm">{errors.subject}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <textarea
            name="msg"
            value={formData.msg}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-2 bg-gray-700 text-white rounded w-full h-32"
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 py-2 cursor-pointer rounded-lg text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {submitted && (
          <p className="text-green-400 text-center mt-4">
            ✅ Your message has been sent successfully!
          </p>
        )}
      </form>
    </section>
  );
};
