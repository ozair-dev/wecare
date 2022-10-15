import React, { useState, useEffect, useRef } from "react";

import { useAuth } from "../../providers/AuthProvider";

import useInView from "react-cool-inview";

import { db } from "../../utils/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";

import Message from "./Message";

const Messages = () => {
  const {
    userDoc: { uid },
  } = useAuth();

  const [messages, setMessages] = useState([]);
  const limitRef = useRef(20);
  const [endReached, setEndReached] = useState(false);

  useEffect(async () => {
    // Getting the most recent messages
    let q = query(
      collection(db, "discussion"),
      orderBy("timestamp", "desc"),
      limit(limitRef.current)
    );
    let result = await getDocs(q);
    setMessages(result.docs);

    // listening for new messages
    q = query(
      collection(db, "discussion"),
      orderBy("timestamp"),
      startAfter(result.docs[0])
    );
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setMessages((prev) => [change.doc, ...prev]);
        }
      });
    });
    return unsub;
  }, []);

  const { observe, inView } = useInView({
    rootMargin: "50px 0px",
    onEnter: async ({ observe, unobserve }) => {
      if (!endReached) {
        unobserve();
        const q = query(
          collection(db, "discussion"),
          orderBy("timestamp", "desc"),
          startAfter(messages[messages.length - 1]),
          limit(limitRef.current)
        );
        const result = await getDocs(q);
        if (result.docs.length) {
          setMessages((prev) => [...prev, ...result.docs]);
        } else {
          setEndReached(true);
        }
        observe();
      }
    },
  });

  return (
    <Box
      flex={1}
      p={1}
      display="flex"
      flexDirection="column-reverse"
      sx={{ overflowY: "scroll", overflowX: "hidden" }}
    >
      {messages.map((message, idx) => (
        <Message
          key={message.id}
          doc={message}
          userID={uid}
          observe={idx === messages.length - 1 ? observe : null}
        />
      ))}

      {inView && !endReached && <LoadingButton size="large" loading />}
    </Box>
  );
};

export default Messages;
