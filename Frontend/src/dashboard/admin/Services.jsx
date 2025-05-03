import { useState, useEffect } from "react";

const Services = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicePrices, setServicePrices] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const fetchEventsWithServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/event/ongoing`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        setEvents(data.events);

        const initialPrices = {};
        const initialEditingState = {};

        data.events.forEach((event) => {
          initialPrices[event._id] = event.price || {}; // load from backend
          initialEditingState[event._id] = false; // start in view mode
        });

        setServicePrices(initialPrices);
        setIsEditing(initialEditingState);

        setLoading(false);
      } catch (error) {
        console.error("Failed to load events with services:", error);
        setLoading(false);
      }
    };

    fetchEventsWithServices();
  }, []);

  const handlePriceChange = (eventId, serviceName, value) => {
    setServicePrices((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [serviceName]: value,
      },
    }));
  };

  const handleSave = async (eventId) => {
    const pricesForEvent = servicePrices[eventId];

    if (!pricesForEvent) {
      alert("Please enter prices for the services.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/event/save-price/${eventId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(pricesForEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save service prices");
      }

      alert(`✅ Prices saved successfully for event ${eventId}!`);
      setIsEditing((prev) => ({
        ...prev,
        [eventId]: false, // lock fields after submit
      }));
    } catch (error) {
      console.error("Error saving service prices:", error);
      alert("❌ Error saving service prices.");
    }
  };

  const handleEdit = (eventId) => {
    setIsEditing((prev) => ({
      ...prev,
      [eventId]: true, // unlock fields for editing
    }));
  };

  if (loading) {
    return (
      <div className="text-white p-10 text-center text-lg animate-pulse">
        Loading events...
      </div>
    );
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-10 text-center">
        🎉 All Events - Requested Services
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-400 text-center">No events found.</p>
      ) : (
        <div className="space-y-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-1">{event.name}</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>📄 Event ID: {event._id}</p>
                  <p>📍 Venue: {event.venue}</p>
                  <p>👥 Guests: {event.numberOfGuests}</p>
                  <p>
                    👤 User: {event.user.name} ({event.user.email})
                  </p>
                </div>
              </div>

              {event.services.length > 0 ? (
                <div className="space-y-3">
                  {event.services.map((service) => (
                    <div
                      key={service}
                      className="flex justify-between items-center border-b border-gray-600 pb-2"
                    >
                      <span className="font-medium">{service}</span>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="border border-gray-500 p-2 rounded-lg w-40 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        value={servicePrices[event._id]?.[service] || ""}
                        onChange={(e) =>
                          handlePriceChange(event._id, service, e.target.value)
                        }
                        disabled={!isEditing[event._id]}
                      />
                    </div>
                  ))}

                  <div className="text-right space-x-3">
                    {!isEditing[event._id] ? (
                      <button
                        onClick={() => handleEdit(event._id)}
                        className="mt-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold transition-transform transform hover:scale-105"
                      >
                        ✏️ Edit Prices
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSave(event._id)}
                        className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold transition-transform transform hover:scale-105"
                      >
                        💾 Submit Prices
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No services requested.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
