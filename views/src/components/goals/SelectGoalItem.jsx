import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch'

const SelectGoalItem = ({doc, observe, handleGoalChange, checked}) => {

  const {image, title} = doc.data()

  return (
  <Box
    ref={observe}
    p={1}
    my={1}
    bgcolor={'grey.A200'}
    borderRadius={2}
    display="flex"
    alignItems="center"
    width={1}
    sx={{"& > img": {width: 50, height: 50, borderRadius: 3}}}>

    <img src={image} alt={doc.id} />

    <Typography variant="h6" color="text.secondary" px={2}>{title}</Typography>

    <Box flex={1} display="flex" justifyContent="flex-end">
      <Switch color="info" checked={checked} onChange={handleGoalChange(doc.id)} inputProps={{'aria-label': "Goal selection"}} />
    </Box>

  </Box>
  );
};

export default SelectGoalItem;
