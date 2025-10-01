// src/components/FileUpload.js
import React, { useState } from "react";
import { evidenceApi } from "../api/evidenceApi";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!file) {
      setStatus("Choose a file first");
      return;
    }
    try {
      setStatus("Uploading...");
      await evidenceApi.upload(file);
      setStatus("Upload successful");
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      console.error(err);
      setStatus(err?.response?.data || "Upload failed");
    }
  };

  return (
    <div className="card">
      <h3>Upload Evidence</h3>
      <form onSubmit={submit}>
        <input type="file" onChange={handleFile} />
        <div style={{ marginTop: 8 }}>
          <button className="btn" type="submit">Upload</button>
        </div>
      </form>
      <div style={{ marginTop: 8 }}>{status}</div>
    </div>
  );
};

export default FileUpload;
