import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default ProtectedRoute;
