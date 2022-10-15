import React, { useEffect, useState } from "react";

import useInView from "react-cool-inview";

import { useAuth } from "../../providers/AuthProvider";

import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import SelectGoalItem from "./SelectGoalItem";

const SelectGoals = ({ selecting, setSelecting }) => {
  const { user, userDoc } = useAuth();
  const [docs, setDocs] = useState([]);
  const [docLimit, setDocLimit] = useState(10);
  const [moreAvailable, setMoreAvailable] = useState(true);

  useEffect(async () => {
    const q = query(collection(db, "goals"), limit(docLimit));
    const qResult = await getDocs(q);
    setDocs(qResult.docs);
    setMoreAvailable(
      !(qResult.docs.length % 10) && !(qResult.docs.length < docLimit)
    );
  }, [docLimit]);

  const { observe } = useInView({
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: async () => {
      if (moreAvailable) {
        setDocLimit((prev) => prev + 10);
      }
    },
  });

  const handleGoalChange = (goal) => async (e) => {
    const { checked } = e.target;

    const userDocRef = doc(db, "users", user.uid);

    if (checked) {
      await updateDoc(userDocRef, {
        goals: arrayUnion(goal),
      });
    } else {
      await updateDoc(userDocRef, {
        goals: arrayRemove(goal),
      });
    }
  };

  return (
    <Modal open={selecting} onClose={() => setSelecting(false)}>
      <Box
        bgcolor="common.white"
        borderRadius={1}
        sx={{
          height: { xs: "90vh", md: "75vh" },
          width: { xs: "90vw", md: "75vw" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Select your goals
        </Typography>
        <Box
          flex={1}
          width={1}
          sx={{
            overflowY: "scroll",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {docs.map((doc, idx) => (
            <SelectGoalItem
              doc={doc}
              checked={userDoc.goals?.includes(doc.id) || false}
              key={doc.id}
              handleGoalChange={handleGoalChange}
              observe={idx === docs.length - 1 ? observe : null}
            />
          ))}
        </Box>

        <Button
          onClick={() => setSelecting(false)}
          variant="contained"
          color="info"
          size="large"
          sx={{ px: 5, mt: 2 }}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default SelectGoals;
