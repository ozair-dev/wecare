import React from "react";

import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

const Auth = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "common.white",
          width: { xs: "85%", md: "75%" },
          height: { md: "60vh" },
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          "& > img": {
            minWidth: "40%",
            height: { xs: "auto", md: "100%" },
            width: { xs: 1, md: "auto" },
          },
        }}
      >
        <img src="/src/assets/images/auth-img.jpg" />

        <Box
          sx={{
            flex: 1,
            height: { md: "100%" },
            p: 3,
            px: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* Outlet component shows the nested routes */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
