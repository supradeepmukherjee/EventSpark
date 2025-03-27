const API_BASE_URL = "https://your-backend-api.com/api/admin"; // Replace with actual backend URL

// Helper function to handle API requests
const apiRequest = async (endpoint, method = "GET", token, body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
};

/* ============================ USERS ============================ */
// Fetch all users
export const fetchUsers = (token) => apiRequest("users", "GET", token);

/* ============================ ANALYTICS ============================ */
// Fetch analytics data
export const fetchAnalyticsData = (token) =>
  apiRequest("analytics", "GET", token);

/* ============================ SETTINGS ============================ */
// Fetch admin settings
export const fetchAdminSettings = (token) =>
  apiRequest("settings", "GET", token);

// Update admin settings
export const updateAdminSettings = (settings, token) =>
  apiRequest("settings", "PUT", token, settings);

/* ============================ EVENTS ============================ */
// Fetch all events
export const fetchEvents = (token) => apiRequest("events", "GET", token);

// Update event status (Approve/Reject)
export const updateEventStatus = (eventId, status, token) =>
  apiRequest(`events/${eventId}`, "PUT", token, { status });
