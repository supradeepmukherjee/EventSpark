
const Hero = () => (
  <section id="home" className="py-8 px-[9%] bg-[#1e1e1e] text-white">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold">
        "YOUR EVENT <span className="text-blue-500">OUR EXPERTIES</span>"
      </h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <img
        src="/images/slide-1.jpg"
        alt="Event 1"
        className="w-full h-48 object-cover rounded-lg"
      />
      <img
        src="/images/slide-2.jpg"
        alt="Event 2"
        className="w-full h-48 object-cover rounded-lg"
      />
      <img
        src="/images/slide-3.jpg"
        alt="Event 3"
        className="w-full h-48 object-cover rounded-lg"
      />
      <img
        src="/images/slide-4.jpg"
        alt="Event 4"
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
  </section>
);

export default Hero;
