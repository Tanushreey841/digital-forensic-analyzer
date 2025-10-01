import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaUpload, FaDownload, FaCheck, FaFilePdf } from "react-icons/fa";
import "./InvestigatorDashboard.css"; //  import CSS

const InvestigatorDashboard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [evidenceList, setEvidenceList] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");

  const fetchEvidence = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/evidence/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvidenceList(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch evidence list");
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file first.");
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("/evidence/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Evidence uploaded successfully!");
      setFile(null);
      fetchEvidence();
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  const handleVerify = async () => {
    if (!selectedEvidence || !file) return setVerificationResult("Select evidence & file");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `/evidence/${selectedEvidence.id}/verify`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = response.data;
      const storedHash = data.storedHash || data.hash || "N/A";
      const recalculatedHash = data.recalculatedHash || data.uploadedHash || "N/A";
      const tampered = data.tampered;

      setVerificationResult(
        `${tampered ? "File is TAMPERED" : "File is AUTHENTIC"}\n` +
        `Stored Hash: ${storedHash}\nRecalculated Hash: ${recalculatedHash}`
      );
    } catch (error) {
      console.error(error);
      setVerificationResult("Verification failed");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Investigator Evidence Report", 105, 15, { align: "center" });

    const date = new Date().toLocaleString();
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${date}`, 10, 25);

    autoTable(doc, {
      startY: 35,
      head: [["#", "File Name", "Type", "Hash", "Uploaded By", "Timestamp"]],
      body: evidenceList.map((ev, idx) => [
        idx + 1,
        ev.fileName || ev.filename || "N/A",
        ev.type || ev.fileType || "N/A",
        ev.hash || ev.sha256 || "N/A",
        ev.uploadedBy || "N/A",
        ev.timestamp ? new Date(ev.timestamp).toLocaleString() : "N/A",
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 102, 204], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("Investigator_Evidence_Report.pdf");
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Investigator Dashboard</h2>

      <div className="card">
        <h3><FaUpload className="icon" /> Upload Evidence</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn upload-btn" onClick={handleUpload}>
          <FaUpload /> Upload
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="card">
        <h3>Uploaded Evidence</h3>
        {evidenceList.length === 0 ? <p>No evidence uploaded</p> : (
          <ul className="evidence-list">
            {evidenceList.map(ev => (
              <li key={ev.id}>
                <input
                  type="radio"
                  name="selectedEvidence"
                  onChange={() => setSelectedEvidence(ev)}
                />
                <span className="file-name">{ev.fileName || ev.filename}</span>
                <span className="hash">{ev.hash}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3><FaCheck className="icon" /> Verify Evidence</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="btn verify-btn" onClick={handleVerify}>
          <FaCheck /> Verify
        </button>
        {verificationResult && <pre className="verify-result">{verificationResult}</pre>}
      </div>

      <div className="card">
        <h3><FaFilePdf className="icon" /> Generate PDF</h3>
        <button className="btn pdf-btn" onClick={generatePDF}>
          <FaFilePdf /> Download Report
        </button>
      </div>
    </div>
  );
};

export default InvestigatorDashboard;
