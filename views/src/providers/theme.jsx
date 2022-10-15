import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, red, cyan, amber } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: orange.A200,
      main: orange.A400,
      dark: orange.A700,
      contrastText: "#fff",
    },
    success: {
      light: green.A400,
      main: green.A700,
      dark: green[800],
      contrastText: "#fff",
    },
    info: {
      light: cyan.A400,
      main: cyan.A700,
      dark: cyan[800],
      contrastText: "#fff",
    },
    error: {
      light: red.A400,
      main: red.A700,
      dark: red[800],
      contrastText: "#fff",
    },
    warning: {
      light: amber.A400,
      main: amber.A700,
      dark: amber[800],
      contrastText: "#fff",
    },
  },
});

export default function MuiThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
