import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 px-[9%] bg-[#1e1e1e] text-white">
      <h1 className="text-center text-4xl font-bold mb-12">
        About <span className="text-blue-500">Us</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="/images/About.jpg"
            alt="About Us"
            className="w-full rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-3xl font-semibold text-white">
            We make your celebrations truly special
          </h1>
          <p className="text-gray-300">
            Welcome to <span className="text-blue-400">EventSpark</span>, where
            every event becomes a special memory. We specialize in creating
            amazing experiences with stunning decor, flawless planning, and
            happy moments that you'll never forget.
          </p>
          <p className="text-gray-300">
            Whether it's a big wedding, a fun concert, or a small birthday
            celebration, our team ensures that every detail is perfect. Your
            dreams matter to us, and together, we bring them to life.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
