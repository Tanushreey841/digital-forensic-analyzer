// src/pages/Dashboard/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { authApi } from "../../api/authApi";
import { FaTrash, FaUserShield, FaUsers } from "react-icons/fa";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await authApi.listUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await authApi.deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="loading-text">Loading users...</p>;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <FaUserShield className="admin-icon" />
        <h2>Admin Dashboard</h2>
      </header>

      {users.length === 0 ? (
        <p className="empty-text">No users found.</p>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th><FaUsers /> Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(u.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
