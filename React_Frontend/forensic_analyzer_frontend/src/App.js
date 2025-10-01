// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import InvestigatorDashboard from "./pages/Dashboard/InvestigatorDashboard";
import ViewerDashboard from "./pages/Dashboard/ViewerDashboard";
import EvidenceList from "./pages/Evidence/EvidenceList";
import EvidenceUpload from "./pages/Evidence/EvidenceUpload";
import AuditLogPage from "./pages/Audit/AuditLogPage";
import ReportGenerator from "./pages/Reports/ReportGenerator";

import "./styles/global.css";
import "./styles/dashboard.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/unauthorized" element={<div className="card"><h3>Unauthorized</h3><p>You do not have access to this page.</p></div>} />

            {/* Protected per role */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["INVESTIGATOR"]} />}>
              <Route path="/dashboard/investigator" element={<InvestigatorDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["VIEWER"]} />}>
              <Route path="/dashboard/viewer" element={<ViewerDashboard />} />
            </Route>

            {/* general authenticated routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/evidence/list" element={<EvidenceList />} />
              <Route path="/evidence/upload" element={<EvidenceUpload />} />
              <Route path="/reports" element={<ReportGenerator />} />
              <Route path="/audit" element={<AuditLogPage />} />
            </Route>

            <Route path="*" element={<div className="card">Page not found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
