import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRequired = ({ children }) => {
  const { user_info } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the user_info is available, we're done loading.
    if (user_info !== undefined) {
      setLoading(false);
    }
  }, [user_info]);

  // If still loading, show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's no user_info, redirect to login
  if (!user_info) {
    return <Navigate to="/auth/sign-in" />;
  }

  // If user_info exists, render children
  return children;
};

export default AuthRequired;
