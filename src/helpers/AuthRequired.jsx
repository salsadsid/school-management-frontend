import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRequired = ({ children }) => {
  const { user_info, userLoading: loading } = useSelector(
    (state) => state.auth
  );

  // If authentication is still in progress, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user_info doesn't exist, redirect to login
  if (!user_info) {
    return <Navigate to="/auth/sign-in" />;
  }

  // If user_info exists, render the children components
  return children;
};

export default AuthRequired;
