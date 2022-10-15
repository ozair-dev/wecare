import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

const PublicRoute = ({ children, restricted }) => {
  const { user } = useAuth();
  if (user && restricted) {
    return <Navigate to="/" />;
  } else return children;
};

export default PublicRoute;
