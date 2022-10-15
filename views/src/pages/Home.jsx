import React, { useEffect, useState } from "react";

import { Link, useLocation, Outlet } from "react-router-dom";

import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled";

import Box from "@mui/material/Box";

const TabButton = styled("button", { shouldForwardProp: isPropValid })(
  ({ theme, isActive }) => ({
    flex: 1,
    fontSize: "1.5rem",
    textAlign: "center",
    textDecoration: "none",
    color: theme.palette.text.secondary,
    boxShadow: isActive && theme.shadows[4],
    border: "none",
    borderRadius: 5,
    padding: "0.5rem 1rem",
    zIndex: isActive ? 1 : 0,
    cursor: "pointer",
  })
);

const Home = () => {
  const [activeTab, setActiveTab] = useState("");

  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname.split("/")[1]);
  }, [location]);

  return (
    <Box sx={{ minHeight: "50vh", height: "1px" }}>
      <Box display="flex">
        <TabButton isActive={activeTab === ""} as={Link} to="/">
          Today's Goals
        </TabButton>
        <TabButton isActive={activeTab === "discuss"} as={Link} to="/discuss">
          Discuss
        </TabButton>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Home;
