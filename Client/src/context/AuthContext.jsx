import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//const API_URL = "http://localhost:3000";
const API_URL = "https://budgify-hjq2.vercel.app";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const Authorization = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const authorize = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${API_URL}/get-account-info`, {
        withCredentials: true,
      });

      if (result.data?.email) {
        setUser(result.data.email);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Authorization failed:", error);
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

  const value = {
    user,
    setUser,
    isLoggedIn,
    setLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
