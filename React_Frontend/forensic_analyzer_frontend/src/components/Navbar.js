// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaShieldAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <FaShieldAlt className="nav-logo" />
        <Link to="/" className="brand">Forensic Analyzer</Link>
      </div>
      <div className="nav-right">
        {isAuthenticated() ? (
          <>
            <span className="nav-user">
              <FaUser className="nav-icon" /> {user?.username} ({user?.role})
            </span>
            <button onClick={onLogout} className="btn small logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="btn">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/auth/signup" className="btn ghost">
              <FaUserPlus /> Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
