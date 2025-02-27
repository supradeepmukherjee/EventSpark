// Contact Component
export const ContactUs = () => {
  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="contact">
      <h1 className="text-3xl font-bold text-center mb-8">
        Contact <span className="text-blue-500">Us</span>
      </h1>
      <form className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            placeholder="Phone"
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-2 bg-gray-700 text-white rounded"
          />
        </div>
        <textarea
          placeholder="Your Message"
          className="p-2 mt-4 bg-gray-700 text-white rounded w-full h-32"
        ></textarea>
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 py-2 rounded-lg text-white hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};
