import React from "react";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AuthTextfield from "./AuthTextField";
import Authsubmitbutton from "./AuthSubmitButton";

import { useAuth } from "../../providers/AuthProvider";
import parseAuthError from "../../helpers/parseAuthError";
import showAuthError from "../../helpers/showAuthError";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  email: string().email("Email is not valid").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be atleast 6 characters long"),
}).required();

const Signup = () => {
  const { signUpUser, setMessage } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h4"
        fontWeight="medium"
        textAlign="center"
        color="primary.main"
      >
        Join The Community
      </Typography>

      <AuthTextfield
        label="Email"
        control={control}
        Controller={Controller}
        errors={errors}
        name="email"
      />
      <AuthTextfield
        label="Password"
        type="password"
        control={control}
        Controller={Controller}
        errors={errors}
        name="password"
      />

      <Authsubmitbutton value="Sign Up" />

      <Typography
        mt={1}
        fontSize={14}
        sx={{ "& > a": { color: "primary.main" } }}
      >
        Already have an account? <Link to="/auth">Login here</Link>
      </Typography>
    </Box>
  );

  async function onSubmit({ email, password }) {
    try {
      await signUpUser(email, password);
      reset();
      setMessage({
        severity: "success",
        value: "Account created",
      });
    } catch (err) {
      const error = parseAuthError(err);
      if (error) {
        showAuthError(setError, error);
      } else {
        setMessage({
          severity: "error",
          message: "Some error occured",
        });
      }
    }
  }
};

export default Signup;
