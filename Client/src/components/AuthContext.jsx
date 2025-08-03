import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setAuthChecked(true);
      })
      .catch(() => {
        setUser(null);
        setAuthChecked(true);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
