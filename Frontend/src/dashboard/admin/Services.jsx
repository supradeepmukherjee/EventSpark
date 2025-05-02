import { useState, useEffect } from "react";

const Services = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicePrices, setServicePrices] = useState({}); // {eventId: {serviceName: price}}

  useEffect(() => {
    const fetchEventsWithServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}/event/all`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setEvents(data.events);
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
        `${import.meta.env.VITE_SERVER}/event/save-service-prices`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            eventId,
            prices: pricesForEvent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save service prices");
      }

      alert(`Prices saved successfully for event ${eventId}!`);
    } catch (error) {
      console.error("Error saving service prices:", error);
      alert("Error saving service prices.");
    }
  };

  if (loading) {
    return <div className="text-white p-5">Loading events...</div>;
  }

  return (
    <div className="p-5 text-white">
      <h2 className="text-2xl font-bold mb-6">
        All Events - Requested Services
      </h2>

      {events.length === 0 ? (
        <p className="text-gray-400">No events found.</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event._id} className="bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-sm text-gray-400 mb-1">
                Event ID: {event._id}
              </p>
              <p className="text-sm text-gray-400 mb-1">Venue: {event.venue}</p>
              <p className="text-sm text-gray-400 mb-3">
                User: {event.user.name} ({event.user.email})
              </p>

              {event.services.length > 0 ? (
                <div className="space-y-2">
                  {event.services.map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <span className="w-40">{service}</span>
                      <input
                        type="number"
                        placeholder="Enter price"
                        className="border p-2 rounded w-40 text-white bg-gray-700"
                        value={servicePrices[event._id]?.[service] || ""}
                        onChange={(e) =>
                          handlePriceChange(event._id, service, e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave(event._id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Submit Prices
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">No services requested.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
