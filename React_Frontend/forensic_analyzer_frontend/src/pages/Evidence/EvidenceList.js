import React, { useEffect, useState } from "react";
import { evidenceApi } from "../../api/evidenceApi";

const EvidenceList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await evidenceApi.getAll();
      setList(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="card">
      <h3>Evidence list</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>File name</th>
              <th>Type</th>
              <th>Uploaded by</th>
              <th>SHA256</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan="6">No evidence found</td></tr>
            )}
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fileName || item.filename || item.file_name || item.file || "N/A"}</td>
                <td>{item.type || "N/A"}</td>
                <td>{item.uploadedBy || "N/A"}</td>
                <td>{item.sha256 || "N/A"}</td>
                <td>{item.timestamp ? new Date(item.timestamp).toLocaleString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={load}>Refresh</button>
      </div>
    </div>
  );
};

export default EvidenceList;
