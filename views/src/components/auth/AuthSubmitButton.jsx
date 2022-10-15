import React from "react";

import Button from "@mui/material/Button";

const Authsubmitbutton = ({ value }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      color="primary"
      type="submit"
      sx={{ my: 1, textTransform: "none" }}
    >
      {value}
    </Button>
  );
};

export default Authsubmitbutton;
