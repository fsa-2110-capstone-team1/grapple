import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Divider,
  Grid,
  Button,
  Box,
  Paper,
  Typography,
  TextField,
  styled,
} from "@mui/material";
import dateFormat from "dateformat";
import { joinChallenge, leaveChallenge } from "../../../store";
import ConfirmActionDialog from "../../../ConfirmActionDialog";
import theme from "../../../theme";

export const JoinChallenge = ({
  challenge,
  userChallenge,
  enrolledUsers,
  userId,
}) => {
  const dispatch = useDispatch();
  

  return (
    <Grid container direction="column" sx={{ alignItems: "center" }}>
      <Grid item>
        <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
          {!!userChallenge.id ? (
            <ConfirmActionDialog
              {...{
                buttonVariant: "contained",
                buttonSize: "large",
                buttonDisabled: challenge.status === "Ended",
                buttonText:
                  challenge.status === "Ended"
                    ? "Challenge Ended"
                    : "Leave Challenge",
                dialogTitle: "Are you sure you want to leave this challenge?",
                dialogText:
                  "This action is permanent. Once you leave the challenge, you will need to re-join and start over.",
                disagreeText: "Cancel",
                agreeText: "Leave Challenge",
                dispatchAction: leaveChallenge,
                dispatchParams: {
                  userChallengeId: userChallenge.id,
                },
                buttonSx: {
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.braun.main,
                },
              }}
            />
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "20px",
                paddingBottom: "20px",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.braun.main,
              }}
              onClick={() => dispatch(joinChallenge(userId, challenge.id))}
            >
              Join Challenge
            </Button>
          )}
        </Box>
      </Grid>
      {/* <Button size="large">Invite A friend</Button> */}
      <Grid item>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {enrolledUsers.length === 0 ? (
            <SentimentVeryDissatisfiedIcon className="sad-face-icon" />
          ) : (
            <ElectricBoltIcon className="electric-bolt" />
          )}
          <Typography variant="p">
            {enrolledUsers.length === 0
              ? "No one currently enrolled in this challenge."
              : enrolledUsers.length === 1
              ? `${enrolledUsers.length} person enrolled in this challenge!`
              : `${enrolledUsers.length} people enrolled in this challenge!`}
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        {enrolledUsers.length >= 1 ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DirectionsRunIcon className="runner-icon" />
            <p className="participant-div">Participants</p>
          </Box>
        ) : (
          ""
        )}
        <Box>
          {enrolledUsers.length >= 1
            ? enrolledUsers?.map((user) => (
                <Typography
                  key={user.id}
                  component={Link}
                  to={`/users/profile/${user.username}`}
                  sx={{ color: theme.palette.primary.main }}
                  variant="inherit"
                >
                  <li className="user-link-li">{user.username}</li>
                </Typography>
              ))
            : ""}
        </Box>
      </Grid>
    </Grid>
  );
};
export default JoinChallenge;
