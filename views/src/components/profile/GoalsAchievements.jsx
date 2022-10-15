import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../providers/AuthProvider";

import { db } from "../../utils/firebase";

import { collection, getDocs } from "firebase/firestore";

import GoalsAchievementAccordion from "./GoalsAchievementAccordion";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

const GoalsAchievements = ({ open, onClose }) => {
  const [goalsHistoryDocs, setGoalsHistoryDocs] = useState([]);

  const { userDoc } = useAuth();

  useEffect(async () => {
    if (userDoc) {
      const collectionRef = collection(
        db,
        "users",
        userDoc.uid,
        "goalsHistory"
      );
      const result = await getDocs(collectionRef);
      setGoalsHistoryDocs(
        result.docs.filter((doc) => Object.keys(doc.data().goals || {}).length)
      );
    }
  }, [userDoc]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: 0.85, md: 0.75 },
          height: { xs: "85vh", md: "75vh" },
          bgcolor: "common.white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "scroll",
        }}
      >
        <Box width={1} display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {goalsHistoryDocs.map((doc) => (
          <GoalsAchievementAccordion key={doc.id} historyDoc={doc} />
        ))}
      </Box>
    </Modal>
  );
};

export default GoalsAchievements;
