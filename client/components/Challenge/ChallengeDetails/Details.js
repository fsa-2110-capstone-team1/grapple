import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";
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
import theme from "../../../theme";

export const Details = ({ challenge, enrolledUsers }) => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <DescriptionIcon sx={{ pr: "10px" }} />
        <Typography variant="p">{challenge.description}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FlagIcon sx={{ pr: "10px" }} />
        <Typography variant="p">
          {challenge.goalType === "daily" ? "Daily" : "Total"} Goal:{" "}
          {challenge.targetNumber} {challenge.targetUnit}{" "}
          {challenge.goalType === "daily" ? "/ day" : ""}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SportsMmaIcon sx={{ pr: "10px" }} />
        <Typography variant="p">
          Difficulty Rating: {challenge.difficulty}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <DateRangeIcon sx={{ pr: "10px" }} />
        <Typography variant="p">
          {dateFormat(challenge.startDateTime, "mediumDate")} -{" "}
          {dateFormat(challenge.endDateTime, "mediumDate")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {challenge.status === "Not Started" ? (
          <CancelIcon sx={{ pr: "10px" }} />
        ) : challenge.status === "In Progress" ? (
          <PendingIcon sx={{ pr: "10px" }} />
        ) : (
          <CheckIcon sx={{ pr: "10px" }} />
        )}
        <Typography variant="p">{challenge.status}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {enrolledUsers.length === 0 ? (
          <SentimentVeryDissatisfiedIcon sx={{ pr: "10px" }} />
        ) : (
          <ElectricBoltIcon sx={{ pr: "10px" }} />
        )}
        <Typography variant="p">
          {enrolledUsers.length === 0
            ? "No one currently enrolled in this challenge."
            : enrolledUsers.length === 1
            ? `${enrolledUsers.length} person enrolled in this challenge!`
            : `${enrolledUsers.length} people enrolled in this challenge!`}
        </Typography>
      </Box>
    </Stack>
  );
};
export default Details;
