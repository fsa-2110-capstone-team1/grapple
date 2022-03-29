import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      // standard: {
      //   main: '#837873',
      // },
      //Primary is green
      primary: {
        light: "#D8F1F6",
        // main: '#248DA2',
        main: "#4AB5A3",
        dark: "#196170",
        contrastText: "#fff",
      },
      secondary: {
        //secondary is pink
        light: "#ff80ab",
        main: "#C54B7B",
        dark: "#a62859",
        contrastText: "#fff",
      },
      orangey: {
        light: "#edb482",
        main: "#F57D52",
        dark: "#db5321",
        contrastText: "#fff",
      },
      yellow: {
        light: "#f5dda6",
        main: "#FEBF30",
        dark: "#e09c00",
        contrastText: "#fff",
      },
      braun: {
        main: "#271F1C",
      },
      grey: {
        main: "#837873",
        dark: "#383432",
      },
      white: {
        main: "#FFFFFF",
      },
    },
  })
);

export default theme;
