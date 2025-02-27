import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about" className="py-8 px-[9%] bg-[#1e1e1e] text-white">
      <h1 className="text-center text-4xl font-bold text-white mb-8">
        About <span className="text-blue-500">Us</span>
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img
            src="/images/About.jpg"
            alt="About Us"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-11">
          <h1 className="text-3xl font-semibold text-white">
            We will give a very special celebration for you
          </h1>
          <p className="text-gray-300">
            An About Us page is the voice of a website from where you can learn
            about the story, history, and mission of its life. Great About Us
            pages work to build a trustworthy relationship between the brand and
            the customer and shape a visual of a business with its name.
          </p>
          <p className="text-gray-300">
            An About Us page is the voice of a website from where you can learn
            about the story, history, and mission of its life.
          </p>
          <Link
            to="contact"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
