import React from "react";

import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Message = ({ doc, userID, observe }) => {
  const { message, images, sender } = doc.data();
  const isMe = userID === sender.uid;
  return (
    <Box
      ref={observe}
      maxWidth={0.75}
      my={0.5}
      display="flex"
      sx={[isMe && { alignSelf: "end" }]}
    >
      {!isMe && (
        <Link to={`/profile/${sender.username}`}>
          <Avatar alt={sender.username} src={sender.photoUrl} sx={{ mr: 1 }} />
        </Link>
      )}
      <Box
        borderRadius={2}
        p={1}
        bgcolor="grey.100"
        sx={[
          {
            "& img": {
              maxWidth: "100%",
              height: "auto",
              mb: 1,
              borderRadius: 2,
            },
            "& > p": {
              my: 0.5,
            },
          },
          isMe && { bgcolor: "navajowhite" },
        ]}
      >
        {!isMe && (
          <Typography fontWeight="bolder" gutterBottom>
            {sender.firstName + " " + sender.lastName}
          </Typography>
        )}

        {!!images?.length &&
          images.map((image, idx) => (
            <img key={idx} src={image} alt="message image" />
          ))}

        {!!message && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        )}
      </Box>
    </Box>
  );
};

export default Message;
