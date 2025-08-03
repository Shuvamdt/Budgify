import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useAuth();

  if (!authChecked) return <div>Loading...</div>; // or a spinner

  return user ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
