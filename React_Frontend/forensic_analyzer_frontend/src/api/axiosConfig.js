// src/api/axiosConfig.js
import axios from "axios";

// Create a new axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // change if backend base path differs
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for attaching JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
