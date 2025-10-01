// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Usage:
 * <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
 *   <Route path="/dashboard/admin" element={<AdminDashboard/>} />
 * </Route>
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  if (allowedRoles && allowedRoles.length > 0) {
    // user may be null for a short moment; guard it
    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
