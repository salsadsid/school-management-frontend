import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRequired = ({ children }) => {
  const { user_info } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user_info) {
      setLoading(false);
    }
  }, [user_info]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user_info ? children : <Navigate to="/login" />;
};

export default AuthRequired;
