import React from "react";
import { useSelector } from "react-redux";
import { Engagespot } from "@engagespot/react-component";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const Notifications = () => {
  const user = useSelector((state) => state.auth) || {};

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {!!user.id ? (
          <Engagespot
            apiKey={process.env.ENGAGESPOT_API_KEY}
            userId={user.id}
            theme={{
              notificationButton: {
                iconFill: "white",
              },
              colors: {
                brandingPrimary: "#C54B7B",
                colorSecondary: "#4AB5A3",
              },
              feedItem: {
                hoverBackground: "#ecebfa",
              },
              dropdown: {
                hoverBackground: "#ecebfa",
                menuItemHoverBackground: "#ecebfa",
              },
            }}
          />
        ) : (
          ""
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Notifications;
