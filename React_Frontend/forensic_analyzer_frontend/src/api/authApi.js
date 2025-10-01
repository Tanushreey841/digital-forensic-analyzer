// src/api/authApi.js
import api from "./axiosConfig";

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials).then((r) => r.data),
  signup: (payload) => api.post("/auth/signup", payload).then((r) => r.data),

  // src/api/authApi.js
  listUsers: () => api.get("/admin/users").then((r) => r.data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`).then((r) => r.data),

};
