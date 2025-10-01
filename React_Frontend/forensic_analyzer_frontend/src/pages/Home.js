// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="centered">
      <div className="card home-card">
        <h1>Forensic Evidence Analyzer</h1>
        <p>Upload and inspect evidence, maintain chain of custody and audits.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/auth/login" className="btn">Login</Link>
          <Link to="/auth/signup" className="btn ghost" style={{ marginLeft: 8 }}>Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
