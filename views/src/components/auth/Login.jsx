import React from "react";

import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import { AiOutlineGoogle } from "react-icons/ai";

import AuthTextField from "./AuthTextField";
import AuthSubmitButton from "./AuthSubmitButton";
import { useAuth } from "../../providers/AuthProvider";
import parseAuthError from "../../helpers/parseAuthError";
import showAuthError from "../../helpers/showAuthError";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  email: string().required("Email is required"),
  password: string().required("Password is required"),
}).required();

const Login = () => {
  const { loginWithEmail, loginWithGoogle, resetPassword, setMessage } =
    useAuth();

  const {
    control,
    watch,
    handleSubmit,
    setError,
    reset,
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
        gutterBottom
      >
        Hey there, Welcome back
      </Typography>

      <AuthTextField
        control={control}
        Controller={Controller}
        errors={errors}
        label="Email"
        type="text"
        name="email"
      />

      <AuthTextField
        control={control}
        Controller={Controller}
        errors={errors}
        label="Password"
        type="password"
        name="password"
      />

      <AuthSubmitButton value="Login" />

      <Button
        color="primary"
        fullWidth
        sx={{ textTransform: "none" }}
        onClick={handlePasswordReset}
      >
        Forgot password
      </Button>

      <Typography
        mt={1}
        fontSize={14}
        sx={{ "&>a": { color: "primary.main" } }}
      >
        New User? <Link to="signup">Sign up here</Link>
      </Typography>

      <Divider flexItem sx={{ mt: 2 }}>
        <Chip label="OR" />
      </Divider>

      <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        fullWidth
        startIcon={<AiOutlineGoogle />}
        sx={{ mt: 2 }}
      >
        Continue With Google
      </Button>
    </Box>
  );

  async function onSubmit({ email, password }) {
    try {
      await loginWithEmail(email, password);
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

  async function handlePasswordReset() {
    try {
      await resetPassword(watch("email"));
      reset();
      setMessage({
        value: "Reset link sent to your email",
        severity: "success",
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

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
      setMessage({
        severity: "error",
        value: "Could not Sign In",
      });
    }
  }
};

export default Login;
