import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useAuth();

  if (!authChecked) {
    return <div></div>;
  }

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
