import React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

import { useAuth } from "../providers/AuthProvider";

const SlideTransition = (props) => <Slide {...props} direction="up" />;

const CustomSnackbar = () => {
  const { message, setMessage } = useAuth();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={!message.hidden && !!message.value}
      onClose={handleClose}
      autoHideDuration={3500}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity={message.severity}
        onClose={handleClose}
        variant="filled"
        elevation={6}
      >
        {message.value}
      </Alert>
    </Snackbar>
  );

  function handleClose(event, reason) {
    if (reason === "clickaway") return;

    setMessage((prev) => ({ ...prev, hidden: true }));
  }
};

export default CustomSnackbar;
