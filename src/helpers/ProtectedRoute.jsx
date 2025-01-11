import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user_info } = useSelector((state) => state.auth);

  // Redirect to login if no user is logged in
  if (!user_info) {
    return <Navigate to="/auth/sign-in" />;
  }

  // Check if the user's role is allowed
  if (!allowedRoles.includes(user_info.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
