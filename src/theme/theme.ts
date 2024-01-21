"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red, purple } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: red[400],
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: "#ffffff",
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#121212",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          scrollbarColor: `${themeParam.palette.background.paper} ${themeParam.palette.background.default}`,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: themeParam.palette.background.default,
            height: 12,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: themeParam.palette.background.paper,
          },
        },
      }),
    },
  },
});

export default theme;
