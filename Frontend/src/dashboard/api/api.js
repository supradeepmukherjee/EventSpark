const API_BASE_URL = import.meta.env.VITE_SERVER;

// 📌 Fetch all payments & transactions
export const fetchPayments = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/payments`, {
      method: "GET",
      credentials: "include", // ✅ Include credentials
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payments");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

// 📌 Fetch support queries
export const fetchSupportQueries = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/contact`, {
      method: "GET",
      credentials: "include", // ✅ Include credentials
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch support queries");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching support queries:", error);
    return [];
  }
};

export const resolveSupportQuery = async (queryId, feedback, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/contact/${queryId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: feedback }), // ✅ Send feedback
      }
    );

    if (!response.ok) {
      throw new Error("Failed to resolve query");
    }

    return await response.json();
  } catch (error) {
    console.error("Error resolving support query:", error);
  }
};

// Helper function to handle API requests
const apiRequest = async (endpoint, method = "GET", token, body = null) => {
  const options = {
    method,
    credentials: "include", // ✅ Include credentials
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
export const fetchUsers = (token) => apiRequest("/user/users", "GET", token);

/* ============================ ANALYTICS ============================ */
// Fetch analytics data
export const fetchAnalyticsData = (token) =>
  apiRequest("/event/analytics", "GET", token);

/* ============================ SETTINGS ============================ */
// Fetch admin settings
export const fetchAdminSettings = (token) =>
  apiRequest("settings", "GET", token);

// Update admin settings
export const updateAdminSettings = (settings, token) =>
  apiRequest("settings", "PUT", token, settings);

/* ============================ EVENTS ============================ */
// Fetch all events
export const fetchEvents = (token) => apiRequest("/event/all", "GET", token);

// Update event status (Approve/Reject)
export const updateEventStatus = (eventId, status, token) =>
  apiRequest(`event/${eventId}`, "PUT", token, { status });
