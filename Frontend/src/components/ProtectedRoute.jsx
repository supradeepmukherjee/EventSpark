import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook for auth state

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get logged-in user data

  return user ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
