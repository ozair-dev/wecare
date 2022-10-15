import React, { useState, useEffect, useRef } from "react";

import parseDate from "../../helpers/parseDate";
import { db } from "../../utils/firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../providers/AuthProvider";

import Box from "@mui/material/Box";

import MyGoalAccordion from "./MyGoalAccordion";

const MyGoals = () => {
  const { userDoc, user } = useAuth();
  const [myGoalsDocs, setMyGoalsDocs] = useState([]);
  const [todayGoalsStateDoc, setTodayGoalsStateDoc] = useState({});

  const todayGoalStateDocRef = useRef(
    doc(db, "users", user.uid, "goalsHistory", parseDate(new Date()))
  );

  useEffect(async () => {
    if (userDoc.goals) {
      const promises = userDoc.goals.map((goal) =>
        getDoc(doc(db, "goals", goal))
      );
      setMyGoalsDocs(await Promise.all(promises));
    }
  }, [userDoc]);

  useState(() => {
    const docRef = todayGoalStateDocRef.current;

    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setTodayGoalsStateDoc(doc.data());
      } else {
        setDoc(docRef, { goals: {} });
      }
    });
    return unsub;
  }, []);

  const markGoalDone = (goal) => async () => {
    const docRef = todayGoalStateDocRef.current;

    const prop = `goals.${goal}`;

    await updateDoc(docRef, {
      [prop]: myGoalsDocs.find((doc) => doc.id === goal).data(),
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {myGoalsDocs.map((doc) => (
        <MyGoalAccordion
          doc={doc}
          key={doc.id}
          checked={!!todayGoalsStateDoc.goals?.hasOwnProperty(doc.id) || false}
          onChange={markGoalDone}
        />
      ))}
    </Box>
  );
};

export default MyGoals;
