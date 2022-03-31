import React from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import theme from "../../../theme";
import UserChallengeDetails from "./UserChallengeDetails";
import TrackProgress from "./TrackProgress";
import CalendarView from "./CalendarView";

export const UserChallengeWrapper = ({
  dailyUserChallenges,
  userChallenge,
  challenge,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Track Your Daily Progress
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={12} md={4}>
          <UserChallengeDetails
            challenge={challenge}
            userChallenge={userChallenge}
          />
        </Grid>
        <Grid item xs={12} md={8} sx={{ justifyContent: "center" }}>
          <CalendarView
            dailyUserChallenges={dailyUserChallenges}
            challenge={challenge}
            userChallenge={userChallenge}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default UserChallengeWrapper;
