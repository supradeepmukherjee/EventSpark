import React from "react";

const Events = () => {
  const events = [
    {
      id: 1,
      title: "30th Rock Climbing Course",
      date: "18-21 Jan",
      image: "thumb.webp",
    },
    {
      id: 2,
      title: "Palashful Basantoutsab",
      date: "28 Feb-02 Mar",
      image: "thumb.webp",
    },
    {
      id: 3,
      title: "3 Days 2 Nights Kolkata",
      date: "31 Jan",
      image: "thumb.webp",
    },
  ];

  return (
    <section className="events py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Popular Events in Kolkata
      </h2>
      <div className="event-cards flex flex-wrap justify-center gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card bg-white shadow-md rounded-lg max-w-xs"
          >
            <img
              src={event.image}
              alt={event.title}
              className="rounded-t-lg w-full"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p className="text-gray-600">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
