import React from "react";

const Filter = ({ onFilterChange }) => {
  const handleCategoryChange = (e) => {
    onFilterChange("category", e.target.value);
  };

  const handleDateChange = (e) => {
    onFilterChange("date", e.target.value);
  };

  const handleLocationChange = (e) => {
    onFilterChange("location", e.target.value);
  };

  return (
    <div className="flex flex-wrap justify-between gap-4 mb-6">
      <div className="flex flex-col w-full sm:w-1/3">
        <label className="font-semibold text-lg">Category</label>
        <select
          className="p-2 border rounded-md"
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="birthday">Birthday</option>
          <option value="wedding">Wedding</option>
          <option value="workshop">Workshop</option>
          <option value="music">Music</option>
          <option value="conference">Conference</option>
        </select>
      </div>

      <div className="flex flex-col w-full sm:w-1/3">
        <label className="font-semibold text-lg">Date</label>
        <input
          type="date"
          className="p-2 border rounded-md"
          onChange={handleDateChange}
        />
      </div>

      <div className="flex flex-col w-full sm:w-1/3">
        <label className="font-semibold text-lg">Location</label>
        <select
          className="p-2 border rounded-md"
          onChange={handleLocationChange}
        >
          <option value="">All Locations</option>
          <option value="kolkata">Kolkata</option>
          <option value="howrah">Howrah</option>
          <option value="darjeeling">Darjeeling</option>
          <option value="purulia">Purulia</option>
          <option value="midnapore">Midnapore</option>
        </select>
      </div>

      <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
