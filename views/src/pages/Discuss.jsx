import React, { useState } from "react";

import Box from "@mui/material/Box";

import Messages from "../components/discuss/Messages";
import DiscussInputForm from "../components/discuss/DiscussInputForm";

const Discuss = () => {
  const [elemRef, setElemRef] = useState(null);

  return (
    <Box
      ref={(newRef) => setElemRef(newRef)}
      display="flex"
      flexDirection="column"
      sx={{ height: `calc(100vh - ${elemRef?.offsetTop}px)` }}
    >
      <Messages />
      <DiscussInputForm />
    </Box>
  );
};

export default Discuss;
