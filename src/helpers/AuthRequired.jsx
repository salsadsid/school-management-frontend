import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRequired = ({ children }) => {
  const { user_info, userLoading: loading } = useSelector(
    (state) => state.auth
  );

  // If authentication is still in progress, show a loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle r="32" cy="40" cx="40" id="test"></circle>
            </svg>
          </div>

          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>

          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect height="64" width="64" y="8" x="8"></rect>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // If user_info doesn't exist, redirect to login
  if (!user_info) {
    return <Navigate to="/auth/sign-in" />;
  }

  // If user_info exists, render the children components
  return children;
};

export default AuthRequired;
