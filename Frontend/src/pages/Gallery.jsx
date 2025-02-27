export const Gallery = () => {
  const galleryImages = [
    { id: 1, src: "g-1.jpg", name: "Corporate Meetup 2024" },
    { id: 2, src: "g-2.jpg", name: "Wedding Celebration" },
    { id: 3, src: "g-3.jpg", name: "Music Festival Night" },
    { id: 4, src: "g-4.jpg", name: "Tech Conference 2024" },
    { id: 5, src: "g-5.jpg", name: "Annual Gala Night" },
    { id: 6, src: "g-6.jpg", name: "Startup Pitch Event" },
    { id: 7, src: "g-7.jpg", name: "Fashion Show 2024" },
    { id: 8, src: "g-8.jpg", name: "Charity Fundraiser" },
    { id: 9, src: "g-9.jpg", name: "Live Concert Series" },
  ];

  return (
    <section className="py-16 px-[9%] bg-[#1e1e1e] text-white" id="gallery">
      <h1 className="text-3xl font-bold text-center mb-8">
        Our <span className="text-blue-500">Gallery</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((event) => (
          <div
            key={event.id}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={`/images/${event.src}`}
              alt={event.name}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="absolute bottom-0 left-0 w-full text-center text-lg font-semibold bg-black bg-opacity-70 p-2">
              {event.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
