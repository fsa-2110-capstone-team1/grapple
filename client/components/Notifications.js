import React from "react";
import { useSelector } from "react-redux";
import { Engagespot } from "@engagespot/react-component";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box } from "@mui/material";

const Notifications = () => {
  const user = useSelector((state) => state.auth) || {};

  const theme = {
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
  };

  return (
    <Box>
      {!!user.id ? (
        <Engagespot
          apiKey={process.env.ENGAGESPOT_API_KEY}
          userId={user.username}
          theme={theme}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Notifications;
