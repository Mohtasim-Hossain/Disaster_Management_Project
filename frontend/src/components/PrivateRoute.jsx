import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";  // Assuming you have useAuth hook

const ProtectedRoute = ({ children, adminOnly = false, volunteerOnly = false }) => {
  const { isAuthenticated, isAdmin, isVolunteer } = useAuth();

  // If the route is admin-only and the user is not an admin, redirect to home
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  // If the route is volunteer-only and the user is not a volunteer, redirect to login
  if (volunteerOnly && !isVolunteer) {
    return <Navigate to="/login" />;
  }

  return children; // If all checks pass, render the children components
};

export default ProtectedRoute;
