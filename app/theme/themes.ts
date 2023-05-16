"use client";

import { amber, blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: amber[700],
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#1f283e",
      paper: "#1e1e1e",
      
    },
  }
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue['A200']
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#f8f8f8",
    }
  }
});