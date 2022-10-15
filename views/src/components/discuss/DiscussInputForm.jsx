import React, { useState, useEffect } from "react";

import { useAuth } from "../../providers/AuthProvider";

import { db, storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
// import B

import PhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

const Input = styled("input")({
  display: "none",
});

const DiscussInputForm = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesTempSources, setImagesTempSources] = useState([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { userDoc } = useAuth();

  useEffect(() => {
    setImagesTempSources(imageFiles.map((file) => URL.createObjectURL(file)));
  }, [imageFiles]);

  return (
    <Box py={1} borderTop={1} borderColor="grey.500" bgcolor="grey.100">
      {/* To Show the images the user has selected to send as message */}
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {imagesTempSources.map((src, idx) => (
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            key={idx}
            width={60}
            height={60}
            m={1}
            borderRadius={1}
            boxShadow={2}
            sx={{ "& img": { maxWidth: "100%", maxHeight: "100%" } }}
          >
            <IconButton
              onClick={() => handleRemoveImage(idx)}
              size="small"
              sx={{ position: "absolute", top: 0, right: 0 }}
              shadow={2}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
            <img src={src} alt="message image" />
          </Box>
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="center"
      >
        <label htmlFor="discuss-images-input">
          <Input
            id="discuss-images-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setImageFiles((prev) => [...prev, ...e.target.files])
            }
            sx={{ display: "none" }}
          />
          <IconButton component="span" size="large">
            <PhotoIcon />
          </IconButton>
        </label>

        <InputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          multiline
          maxRows={8}
          placeholder="What's in your mind? (Markdown supported)"
          sx={{
            height: 1,
            border: 1,
            bgcolor: "common.white",
            borderColor: "grey.400",
            borderRadius: 3,
            px: 2,
          }}
        />

        <IconButton disabled={uploading} type="submit" color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );

  function handleRemoveImage(idx) {
    // setImageFiles((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setImageFiles((prev) => prev.filter((img, index) => index !== idx));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {};

    if (imageFiles.length) {
      setUploading(true);
      data.images = await uploadImages();
      setUploading(false);
    }

    if (message) {
      data.message = message;
    }

    if (!Object.keys(data).length) return;

    const { uid, photoUrl, firstName, lastName, username } = userDoc;

    const sender = { uid, photoUrl, firstName, lastName, username };

    try {
      const collectionRef = collection(db, "discussion");
      await addDoc(collectionRef, {
        ...data,
        timestamp: serverTimestamp(),
        sender,
      });
      setMessage("");
      setImageFiles([]);
    } catch (err) {
      console.log(err);
    }
  }

  async function uploadImages() {
    const promises = imageFiles.map(async (imageFile) => {
      const imageRef = ref(storage, `discuss/${Date.now() + imageFile.name}`);

      try {
        const snapshot = await uploadBytes(imageRef, imageFile, {
          contentType: imageFile.type,
        });

        return getDownloadURL(snapshot.ref);
      } catch {
        alert("Some image(s) could not be uploaded");
      }
    });

    try {
      return await Promise.all(promises);
    } catch (err) {
      alert("image(s) Could not be uploaded");
    }
  }
};

export default DiscussInputForm;
