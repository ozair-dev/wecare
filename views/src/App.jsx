import React, { lazy, Suspense } from "react";

import { Routes, Route, Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import AuthProvider from "./providers/AuthProvider";

import SuspenseFallback from "./components/SuspenseFallback";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
const Discuss = lazy(() => import("./pages/Discuss"));
import Auth from "./pages/Auth";
import Login from "./components/auth/Login";

const SignUp = lazy(() => import("./components/auth/SignUp"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const Profile = lazy(() => import("./pages/Profile"));

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import CustomSnackbar from "./components/CustomSnackbar";

function App() {
  return (
    <AuthProvider>
      <Box className="App">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Box sx={{ minHeight: "90vh", height: "1px" }}>
                  <Navbar />
                  <Outlet />
                </Box>
              </PrivateRoute>
            }
          >
            <Route path="" element={<Home />}>
              <Route index element={<Goals />} />
              <Route
                path="discuss"
                element={
                  <Suspense fallback={<SuspenseFallback />}>
                    <Discuss />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="profile/:username"
              element={
                <Suspense fallback={<SuspenseFallback />}>
                  <Profile />
                </Suspense>
              }
            />

            <Route
              path="update-profile"
              element={
                <Suspense fallback={<SuspenseFallback />}>
                  <UpdateProfile />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="auth"
            element={
              <PublicRoute restricted>
                <Auth />
              </PublicRoute>
            }
          >
            <Route index element={<Login />} />
            <Route
              path="signup"
              element={
                <Suspense fallback={<SuspenseFallback />}>
                  <SignUp />
                </Suspense>
              }
            />
          </Route>
        </Routes>

        {/* snackbar components shows notifications on screen */}
        <CustomSnackbar />
      </Box>
    </AuthProvider>
  );
}

export default App;
