import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../../theme";
import dateFormat from "dateformat";
import {
  updateChallengeProgress,
  createDailyUserChallenge,
  getUserChallenge,
} from "../../../store";
import ProgressBar from "../../User/UserDashboard/ProgressBar";

export const UserChallengeDetails = ({ userChallenge, challenge }) => {
  return (
    <>
      {!!userChallenge?.id && (
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <Stack spacing={1}>
            <Typography>
              <b>Joined On:</b>{" "}
              {dateFormat(userChallenge.createdAt, "mediumDate")}
            </Typography>
            <Typography>
              <b>Status:</b> {userChallenge.status}{" "}
              {userChallenge.status === "Completed" && "👑"}
            </Typography>
            <Typography>
              <b>Total Progress:</b> {userChallenge.currentProgress}{" "}
              {challenge.goalType === "daily" ? "days" : challenge.targetUnit} (
              {(userChallenge.percentCompleted * 100).toFixed(1)}
              %)
            </Typography>
            <ProgressBar
              props={{
                bgColor: { bgcolor: "#4AB5A3" },
                completed: (userChallenge.percentCompleted * 100).toFixed(1),
              }}
            />
          </Stack>
        </Box>
      )}
    </>
  );
};
export default UserChallengeDetails;
