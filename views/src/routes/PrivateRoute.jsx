import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, userDoc } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  } else if (
    !userDoc?.profileCompleted &&
    !location.pathname.endsWith("update-profile")
  ) {
    return <Navigate to="/update-profile" />;
  } else return children;
};

export default PrivateRoute;
