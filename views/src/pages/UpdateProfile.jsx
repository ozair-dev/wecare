import React, { useState, useEffect } from "react";

import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { db, storage } from "../utils/firebase";

import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import DatePicker from "@mui/lab/DatePicker";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  firstName: string().required("This field is required"),
  lastName: string().required("This Field is required"),
  username: string()
    .min(4, "Must be atleast 4 characters long")
    .matches(/^[a-z][a-z0-9]*$/i, {
      message:
        "Username must start with an alphabet and can only contain alphanumeric values",
    }),
}).required();

import { useAuth } from "../providers/AuthProvider";

const Input = styled("input")({
  display: "none",
});

const UpdateProfile = () => {
  const { userDoc, user, setMessage } = useAuth();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      bio: "",
    },
    resolver: yupResolver(schema),
  });

  const [birthDate, setBirthDate] = useState(new Date());

  const [file, setFile] = useState(null);
  const [photoSrc, setPhotoSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/wecare-8081e.appspot.com/o/dp.jpg?alt=media&token=903b558c-9a15-411a-a7ab-a9fac04369da"
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDoc?.profileCompleted) {
      const { firstName, lastName, bio, username } = userDoc;
      reset({ firstName, lastName, bio, username });
      setBirthDate(userDoc.birthDate.toDate());
      setPhotoSrc(userDoc.photoUrl);
    }
  }, [userDoc]);

  useEffect(() => {
    if (file) {
      setPhotoSrc(URL.createObjectURL(file));
    }
  }, [file]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: { xs: 0.85, md: 0.6 },
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* to show/update profile picture */}
      <Box
        sx={{
          width: 175,
          height: 175,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          border: 1,
          borderColor: "lightgrey",
          my: 1,
          "& > img": {
            width: 1,
            height: "100%",
          },
          "& > label": {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#ffffff6b",
            backdropFilter: "blur(5px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            opacity: 0,
            "&:hover": {
              opacity: 1,
            },
          },
        }}
      >
        <img title="Profile Picture" src={photoSrc} />
        <label htmlFor="profile-picture-input">
          <Input
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            id="profile-picture-input"
            type="file"
          />
          <CameraAltIcon fontSize="large" sx={{ my: 1, color: "grey.A700" }} />
          <Typography color="grey.A700">Upload</Typography>
        </label>
      </Box>

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} md={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                label="First Name"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Last Name"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.username}
            helperText={errors.username?.message}
            label="Username"
            fullWidth
            margin="dense"
          />
        )}
      />

      <Controller
        name="bio"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Bio"
            fullWidth
            multiline
            margin="dense"
          />
        )}
      />

      <Typography
        fontWeight="medium"
        color="primary.main"
        width={1}
        mt={2}
        gutterBottom
      >
        Your Date of Birth
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Birth Date"
          value={birthDate}
          inputFormat="dd/mm/yyyy"
          onChange={setBirthDate}
          renderInput={(params) => (
            <TextField {...params} margin="dense" fullWidth />
          )}
        />
      </LocalizationProvider>

      <LoadingButton
        loading={loading}
        variant="contained"
        type="submit"
        sx={{ my: 2 }}
      >
        Update Profile
      </LoadingButton>
    </Box>
  );

  async function onSubmit(data) {
    if (birthDate === "Invalid Date") return;

    setLoading(true);

    try {
      // Cheking if username is available
      const isTaken = await isUsernameTaken(data.username);

      if (isTaken) {
        setError("username", {
          type: "username taken",
          message: "Username is already taken, please try another one",
        });
        return;
      }

      // profile pic url
      let photoUrl = photoSrc;
      if (file) {
        photoUrl = await uploadPhoto();
      }

      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        { ...data, birthDate, photoUrl, profileCompleted: true },
        { merge: true }
      );
      setMessage({
        severity: "success",
        value: "Profile updated",
      });
    } catch {
      setMessage({
        severity: "error",
        value: "Some error occured while updating your profile",
      });
    }
    setLoading(false);
  }

  async function isUsernameTaken(username) {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("username", "==", username));
    const snap = await getDocs(q);
    return !!snap.docs.length && snap.docs[0].id !== user.uid;
  }

  async function uploadPhoto() {
    const photoRef = ref(storage, `profiles/${user.uid}`);
    const metadata = { contentType: file.type };

    const snapshot = await uploadBytes(photoRef, file, metadata);
    return await getDownloadURL(snapshot.ref);
  }
};

export default UpdateProfile;
