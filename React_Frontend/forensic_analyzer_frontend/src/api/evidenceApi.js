// src/api/evidenceApi.js
import api from "./axiosConfig";

export const evidenceApi = {
  upload: (file) => {
    const form = new FormData();
    form.append("file", file); // backend expects "file"
    return api.post("/evidence/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(r => r.data);
  },

  getAll: () => api.get("/evidence/all").then((r) => r.data),
};
