import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import GoalsAchievements from "../components/profile/GoalsAchievements";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";

const Img = styled("img")({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  border: "1px solid lightgray",
});

const Profile = () => {
  const [userDoc, setUserDoc] = useState(null);

  const [achievementsModalOpen, setAchievementsModalOpen] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  useEffect(async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", params.username)
    );
    const result = await getDocs(q);
    const userDoc = result.docs[0];
    if (userDoc) {
      setUserDoc(userDoc);
    } else {
      navigate("/");
    }
  }, []);

  const { firstName, lastName, username, bio, photoUrl } =
    userDoc?.data() || {};

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      {!!userDoc && (
        <>
          <Img src={photoUrl} />
          <Typography variant="h4" mt={1} gutterBottom>
            {firstName + " " + lastName}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {"@" + username}
          </Typography>

          <Box
            p={1}
            mt={3}
            bgcolor="ghostwhite"
            borderRadius={5}
            sx={{ width: { xs: 0.85, md: 0.55 } }}
          >
            <Typography variant="h5" fontWeight="bold">
              Bio:
            </Typography>
            <Typography variant="h6" pl={2} color="text.secondary">
              {bio}
            </Typography>
          </Box>

          <Button
            onClick={() => setAchievementsModalOpen(true)}
            variant="outlined"
            sx={{ mt: 3, textTransform: "none" }}
          >
            See Daily Goals Achievements
          </Button>

          <GoalsAchievements
            open={achievementsModalOpen}
            onClose={() => setAchievementsModalOpen(false)}
          />
        </>
      )}
    </Box>
  );
};

export default Profile;
