import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("placeprep_auth_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (token) {
        try {
          const res = await authService.getMe(token);
          if (res.success) {
            setUser(res.user);
          } else {
            // Token invalid or expired
            localStorage.removeItem("placeprep_auth_token");
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Auth init error:", error);
          localStorage.removeItem("placeprep_auth_token");
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }

    initAuth();
  }, [token]);

  const login = (authToken, userData) => {
    localStorage.setItem("placeprep_auth_token", authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("placeprep_auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
