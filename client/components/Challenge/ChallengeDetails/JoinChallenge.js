import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Divider,
  Stack,
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

  const state = useSelector((state) => state);
  const isAdmin = state.auth.isAdmin;

  // console.log(isAdmin)
  const location = useLocation().pathname;

  return (
    <Stack
      spacing={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        {challenge.status === "Ended" ? (
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
            disabled
          >
            Challenge Ended
          </Button>
        ) : !!userChallenge.id ? (
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
      {/* <Button size="large">Invite A friend</Button> */}
    </Stack>
  );
};
export default JoinChallenge;
