import React, { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import styled from "@emotion/styled";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InfoIcon from "@mui/icons-material/Info";

import MyGoals from "../components/goals/MyGoals";
import SelectGoals from "../components/goals/SelectGoals";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const Goals = () => {
  const [selecting, setSelecting] = useState(false);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={1}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography>Guidelines:</Typography>
              <ul sx={{ "& li": { my: 20 } }}>
                <li>
                  Select daily goals of your choice by clicking the select
                  button
                </li>
                <li>Login daily and mark your goals as completed</li>
                <li>You can see your goals progress in your profile page</li>
                <li>Talk about health stuff in the discussion tab</li>
              </ul>
            </React.Fragment>
          }
        >
          <IconButton color="info" size="small" sx={{ mr: 2 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </HtmlTooltip>

        <IconButton
          onClick={() => setSelecting(true)}
          variant="filled"
          color="primary"
        >
          <DriveFileRenameOutlineIcon fontSize="large" />
        </IconButton>
      </Box>

      <MyGoals />

      <SelectGoals selecting={selecting} setSelecting={setSelecting} />
    </Box>
  );
};

export default Goals;
