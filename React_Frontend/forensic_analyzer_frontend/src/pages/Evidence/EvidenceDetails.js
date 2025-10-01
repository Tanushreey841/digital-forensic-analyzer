import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { evidenceApi } from "../../api/evidenceApi";
import { auditApi } from "../../api/auditApi";

export default function EvidenceDetails() {
  const { id } = useParams();
  const [meta, setMeta] = useState(null);
  const [audit, setAudit] = useState([]);
  const [verif, setVerif] = useState(null);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {
      const m = await evidenceApi.getEvidence(id);
      setMeta(m);
      const a = await auditApi.getAuditByEvidenceId(id);
      setAudit(a || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load evidence");
    }
  }

  const handleVerify = async () => {
    try {
      const v = await evidenceApi.verifyEvidence(id);
      setVerif({
        matching: v.matching,
        storedHash: v.storedHash || v.hash || "N/A",
        recalculatedHash: v.recalculatedHash || v.uploadedHash || "N/A",
      });
    } catch (err) {
      alert("Verify failed");
    }
  };

  const handleDownload = async () => {
    if (!meta?.fileName) return;
    try {
      const blob = await evidenceApi.downloadFile(meta.fileName);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = meta.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Download failed");
    }
  };

  if (!meta) return <p>Loading...</p>;

  return (
    <div className="card">
      <h3>Evidence Details</h3>
      <p><strong>File:</strong> {meta.fileName}</p>
      <p><strong>Type:</strong> {meta.fileType}</p>
      <p><strong>SHA256:</strong> <span className="mono">{meta.sha256 || "N/A"}</span></p>
      <p><strong>Uploaded By:</strong> {meta.uploadedBy}</p>
      <p><strong>Timestamp:</strong> {meta.timestamp ? new Date(meta.timestamp).toLocaleString() : "N/A"}</p>

      <div className="actions">
        <button className="btn" onClick={handleDownload}>Download</button>
        <button className="btn" onClick={handleVerify}>Verify Integrity</button>
      </div>

      {verif && (
        <div className="verify-result">
          <h4>Verify Result</h4>
          <p>Matching: {verif.matching ? "Yes" : "No"}</p>
          <p>Stored Hash: <span className="mono">{verif.storedHash}</span></p>
          <p>Recalculated Hash: <span className="mono">{verif.recalculatedHash}</span></p>
        </div>
      )}

      <section>
        <h4>Audit Trail</h4>
        <table className="table">
          <thead><tr><th>ID</th><th>Action</th><th>Actor</th><th>Timestamp</th></tr></thead>
          <tbody>
            {audit.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.action}</td>
                <td>{a.actor}</td>
                <td>{a.timestamp ? new Date(a.timestamp).toLocaleString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
