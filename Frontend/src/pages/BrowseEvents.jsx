import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import EventCard from "../components/EventCard";

const BrowseEvents = () => {
  // State to track selected filters
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  // Sample event data
  const events = [
    {
      id: 1,
      title: "30th Rock Climbing Course",
      location: "Kolkata",
      date: "18-21 Jan",
      image: "event1.jpg",
    },
    {
      id: 2,
      title: "Palashful Basantoutsab",
      location: "Darjeeling",
      date: "28 Feb-02 Mar",
      image: "event2.jpg",
    },
    {
      id: 3,
      title: "3 Days 2 Nights in Purulia",
      location: "Purulia",
      date: "31 Jan",
      image: "event3.jpg",
    },
  ];

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    if (filterType === "category") setCategory(value);
    if (filterType === "date") setDate(value);
    if (filterType === "location") setLocation(value);
  };

  // Function to apply filters
  const filteredEvents = events.filter((event) => {
    return (
      (category
        ? event.title.toLowerCase().includes(category.toLowerCase())
        : true) &&
      (date ? event.date.includes(date) : true) &&
      (location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true)
    );
  });

  return (
    <div className="font-sans bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Browse Events</h1>
        <p className="text-xl text-center mb-8">
          Find the perfect event for you!
        </p>

        <Filter onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No events found for the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseEvents;
