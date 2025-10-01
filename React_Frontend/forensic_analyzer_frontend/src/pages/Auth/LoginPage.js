import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      const role = data.role?.toUpperCase();
      if (role === "ADMIN") navigate("/dashboard/admin");
      else if (role === "INVESTIGATOR") navigate("/dashboard/investigator");
      else if (role === "VIEWER") navigate("/dashboard/viewer");
      else navigate("/");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h2>Digital Forensics Project Login</h2>
        <form onSubmit={submit}>
          <div className="input-group">
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
          </div>
          <button className="login-btn" type="submit">
            LOGIN
          </button>
        </form>
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
