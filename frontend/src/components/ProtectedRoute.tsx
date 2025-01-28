import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userContext = useContext(UserContext);

  if (!userContext?.user) {
    // Redirect to /login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
