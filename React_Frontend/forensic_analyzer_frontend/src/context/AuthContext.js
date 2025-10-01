// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return username && role ? { username, role } : null;
  });

  useEffect(() => {
    // nothing for now; placeholder for token refresh if you add that later
  }, []);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    // Expecting { jwt, username, role }
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    setUser({ username: data.username, role: data.role });
    return data;
  };

  const signup = async (payload) => {
    const data = await authApi.signup(payload);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
  };

  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
