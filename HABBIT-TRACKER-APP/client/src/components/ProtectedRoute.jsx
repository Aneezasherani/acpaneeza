import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  if (requiredRole) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== requiredRole) {
        return <Navigate to="/" replace />;
      }
    } catch (err) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
