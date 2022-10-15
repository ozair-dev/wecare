import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import MuiThemeProvider from "./providers/theme";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
