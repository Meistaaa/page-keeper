import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(UserContext);

  if (!context) return null; // Handle missing context edge case

  const { user, loading } = context;

  if (loading) return <div>Loading...</div>; // Prevent premature redirects

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
