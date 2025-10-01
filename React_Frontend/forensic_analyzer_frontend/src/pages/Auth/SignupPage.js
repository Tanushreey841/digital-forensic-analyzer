import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "", role: "VIEWER" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      setMsg("Signup successful. Redirecting...");
      setTimeout(() => navigate("/auth/login"), 1200);
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      {/* Left image side */}
      <div className="auth-image"></div>

      {/* Right form side */}
      <div className="auth-form">
        <div className="auth-card">
          <h2>Create Account</h2>
          <form onSubmit={submit}>
            <label>Username</label>
            <input
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={onChange}
              required
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={onChange}
              required
            />

            <label>Role</label>
            <select name="role" value={form.role} onChange={onChange}>
              <option value="VIEWER">Viewer</option>
              <option value="INVESTIGATOR">Investigator</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button className="btn" type="submit">Signup</button>
          </form>
          {msg && <div className="auth-msg">{msg}</div>}

          <p className="auth-footer">
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
