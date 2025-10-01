// src/pages/Reports/ReportGenerator.js
import React from "react";

/**
 * Placeholder Report generator.
 * Because backend currently doesn't supply an API for reports, this page is a UI stub.
 * Later: call backend endpoint to produce PDF (or implement in frontend using jsPDF).
 */
const ReportGenerator = () => {
  return (
    <div className="card">
      <h3>Report Generator</h3>
      <p>Generate PDF reports about suspicious activity (placeholder).</p>
      <div>
        <button className="btn">Generate (not implemented)</button>
      </div>
    </div>
  );
};

export default ReportGenerator;
