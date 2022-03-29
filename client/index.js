import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("app")
);
