// src/pages/Evidence/EvidenceUpload.js
import React from "react";
import FileUpload from "../../components/FileUpload";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EvidenceUpload = ({ onUploaded }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Only investigators allowed; the backend enforces too.
  if (!user || user.role !== "INVESTIGATOR") {
    return (
      <div className="card">
        <h3>Upload Evidence</h3>
        <p>You must be an Investigator to upload evidence.</p>
        <button className="btn" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      <FileUpload onUploadSuccess={onUploaded} />
    </div>
  );
};

export default EvidenceUpload;
