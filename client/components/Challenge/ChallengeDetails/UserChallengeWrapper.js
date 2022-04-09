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
import ParticipantsTable from "./ParticipantsTable";

export const UserChallengeWrapper = ({
  dailyUserChallenges,
  userChallenge,
  challenge,
  enrolledUsers,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
      <Divider sx={{ width: "80vw", mt: 3, mb: 3 }} />
      <ParticipantsTable
        enrolledUsers={enrolledUsers}
        userChallenge={userChallenge}
      />
    </Box>
  );
};
export default UserChallengeWrapper;
