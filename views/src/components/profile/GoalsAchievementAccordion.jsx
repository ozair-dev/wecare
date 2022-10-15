import React from "react";

import Box from "@mui/material/Box";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import styled from "@emotion/styled";

const Img = styled("img")({
  height: 50,
  width: 50,
  borderRadius: 10,
});

const HistoryItem = ({ info }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center">
    <Box display="flex" alignItems="center">
      <Img src={info.image} />
      <Typography fontWeight="bold" color="text.secondary" ml={1}>
        {info.title}
      </Typography>
    </Box>
    <CheckBoxIcon color="success" />
  </Box>
);

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.grey.A100}`,
  borderRadius: theme.spacing(2),
  marginBottom: 10,
  width: "95%",
  "&:before": {
    display: "none",
  },
}));

const GoalsAchievementAccordion = ({ historyDoc }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ bgcolor: "grey.A100" }}
      >
        <Typography variant="h6" color="text.secondary">
          {historyDoc.id}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.keys(historyDoc.data().goals).map((goal) => (
          <HistoryItem key={goal} info={historyDoc.data().goals[goal]} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GoalsAchievementAccordion;
