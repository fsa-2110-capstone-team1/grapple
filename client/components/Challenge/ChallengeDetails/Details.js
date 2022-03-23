import React, { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";
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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import dateFormat from "dateformat";

export const Details = ({ challenge }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DescriptionIcon className="description-icon" />
            <Typography variant="p">
              Overview: {challenge.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SportsMmaIcon className="boxing-icon" />
            <Typography variant="p">
              Difficulty Rating: {challenge.difficulty}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DateRangeIcon className="date-range-icon" />
            <Typography variant="p">
              Dates: {dateFormat(challenge.startDateTime, "mediumDate")} -{" "}
              {dateFormat(challenge.endDateTime, "mediumDate")}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {challenge.status === "Not Started" ? (
              <CancelIcon sx={{ pr: "10px" }} />
            ) : challenge.status === "In Progress" ? (
              <PendingIcon sx={{ pr: "10px" }} />
            ) : (
              <CheckIcon sx={{ pr: "10px" }} />
            )}
            <p>Status: {challenge.status}</p>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Details;
