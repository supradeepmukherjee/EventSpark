import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData"); // Retrieve stored user info

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser); // Set user with role
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("userData"); // Clear corrupted data
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
