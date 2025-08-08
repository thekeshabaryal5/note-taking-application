import { createContext, useEffect, useState } from "react";
import { loginApi, profileApi } from "../const";
import axios from "axios";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(profileApi, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const login = async (userData) => {
    try {
      const response = await axios.post(`${loginApi}`, userData, {
        withCredentials: true,
      });

      if (response.data.message === "Login success") {
        await fetchUser();
        return true;
      }
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
