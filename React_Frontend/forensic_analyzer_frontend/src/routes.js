// src/routes.js
// (Optional central route list — used if you want to import route paths elsewhere)
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN_DASH: "/dashboard/admin",
  INVESTIGATOR_DASH: "/dashboard/investigator",
  VIEWER_DASH: "/dashboard/viewer",
  EVIDENCE_UPLOAD: "/evidence/upload",
  EVIDENCE_LIST: "/evidence/list",
  EVIDENCE_DETAILS: (id) => `/evidence/${id}`,
  AUDIT: "/audit",
  REPORTS: "/reports",
};
