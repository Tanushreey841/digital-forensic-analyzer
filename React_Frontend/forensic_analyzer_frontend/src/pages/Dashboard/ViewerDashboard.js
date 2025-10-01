import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

const ViewerDashboard = () => {
  const [evidence, setEvidence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch all evidence (read-only for viewers)
  const fetchEvidence = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/evidence/viewer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvidence(res.data);
      if (res.data.length === 0) {
        setMessage("No evidence available.");
      }
    } catch (err) {
      console.error("Failed to fetch evidence", err);
      setMessage("❌ You are not authorized to view evidence.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Viewer Dashboard</h2>
      <p>View uploaded evidence below:</p>

      {loading ? (
        <p>Loading evidence...</p>
      ) : message ? (
        <p>{message}</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0A74DA", color: "#fff" }}>
              <th>ID</th>
              <th>Filename</th>
              <th>Type</th>
              <th>Uploaded By</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.fileName}</td>
                <td>{e.fileType || e.type}</td>
                <td>{e.uploadedBy}</td>
                <td>{new Date(e.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewerDashboard;
