// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role;

  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>

        {(role === "ADMIN") && (
          <>
            <li><Link to="/dashboard/admin">Admin Dashboard</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/audit">Audit Logs</Link></li>
          </>
        )}

        {(role === "INVESTIGATOR") && (
          <>
            <li><Link to="/dashboard/investigator">Investigator Dashboard</Link></li>
            <li><Link to="/evidence/upload">Upload Evidence</Link></li>
            <li><Link to="/evidence/list">Evidence List</Link></li>
          </>
        )}

        {(role === "VIEWER") && (
          <>
            <li><Link to="/dashboard/viewer">Viewer Dashboard</Link></li>
            <li><Link to="/evidence/list">Evidence List</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
}
