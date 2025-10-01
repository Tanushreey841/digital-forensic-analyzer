// src/api/auditApi.js
import axios from "./axiosConfig";

export const auditApi = {
  getAuditByEvidenceId: (evidenceId) => axios.get(`/audit/${evidenceId}`).then(r => r.data),
  getAllAudits: (params) => axios.get("/audit", { params }).then(r => r.data),
};
