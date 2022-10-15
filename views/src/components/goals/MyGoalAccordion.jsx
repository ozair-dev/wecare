import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MyGoalAccordion = ({ doc, onChange, checked }) => {
  const { image, title, instruction, gains } = doc.data();

  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={[
        {
          bgcolor: "grey.A200",
          color: "text.secondary",
          my: 0.2,
          p: 0.5,
          borderRadius: 1,
          width: { xs: 0.9, md: 0.75 },
          transition: "margin 0.25s",
        },
        expanded && {
          my: 2,
        },
      ]}
    >
      <Box
        height="auto"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          onClick={handleExpand}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "& > img": { width: 50, height: 50, mx: 1 },
          }}
        >
          <IconButton>
            <ArrowForwardIosIcon
              sx={[
                { transition: "transform 0.5s", transform: "rotate(0deg)" },
                expanded && { transform: "rotate(90deg)" },
              ]}
            />
          </IconButton>
          <img src={image} alt={title} />
          <Typography variant="h6" ml={1}>
            {title}
          </Typography>
        </Box>

        <Checkbox
          disabled={checked}
          checked={checked}
          onChange={onChange(doc.id)}
          icon={<HourglassTopIcon fontSize="large" color="warning" />}
          checkedIcon={<CheckBoxIcon color="success" fontSize="large" />}
        />
      </Box>

      <Box
        sx={[
          {
            p: 0,
            maxHeight: 0,
            opacity: 0,
            overflow: "hidden",
            transition: "all 0.5s ease-out, opacity 0.25s, display 0s",
          },
          expanded && {
            p: 1,
            maxHeight: 1000,
            opacity: 1,
            transition: "all 0.25s ease-in, opacity 0.5s",
          },
        ]}
      >
        <Typography fontWeight="medium">{instruction}</Typography>

        {!!gains?.length && (
          <>
            <Typography fontWeight="medium" fontSize={20} my={1}>
              Benifits:{" "}
            </Typography>
            <Box sx={{ columnCount: { xs: 2, sm: 3 }, columnGap: 3 }}>
              {gains.map((gain, idx) => (
                <Box
                  key={idx}
                  m={1}
                  display="inline-block"
                  borderRadius={2}
                  overflow="hidden"
                  border={2}
                  borderColor="grey.400"
                  sx={{
                    width: 1,
                    "& img": { width: 1, height: "auto", mb: 0 },
                  }}
                >
                  <img src={gain.image} />
                  <Typography p={1} pt={0}>
                    {gain.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );

  function handleExpand() {
    setExpanded((prev) => !prev);
  }
};

export default MyGoalAccordion;
