// src/pages/Audit/AuditLogPage.js
import React from "react";

/**
 * Backend lacks audit endpoints in provided zip. This is a placeholder.
 * After you add GET /audit/{evidenceId} or /audit/all, we can populate this page.
 */
const AuditLogPage = () => {
  return (
    <div className="card">
      <h3>Audit Logs</h3>
      <p>No audit API present in backend zip. Add GET /audit/{'{evidenceId}'} or /audit/all to fetch logs.</p>
    </div>
  );
};

export default AuditLogPage;
