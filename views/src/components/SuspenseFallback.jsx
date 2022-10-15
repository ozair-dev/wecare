import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const SuspenseFallback = () => {
  return (
    <Box
      sx={{
        width: 1,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default SuspenseFallback;
