import React, { useState } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays } from "date-fns";
import TrackProgress from "./TrackProgress";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
} from "@mui/material";

const CalendarView = ({ dailyUserChallenges, userChallenge, challenge }) => {
  function isSameDay(a, b) {
    return differenceInCalendarDays(new Date(a), new Date(b)) === 0;
  }
  const datesWithData = dailyUserChallenges.map((duc) => new Date(duc.date));
  const datesCompleted = dailyUserChallenges
    .filter(
      (duc) =>
        challenge.goalType === "daily" && duc.total >= challenge.targetNumber
    )
    .map((duc) => new Date(duc.date));

  const [date, setDate] = useState(new Date());

  function onChange(nextValue) {
    setDate(nextValue);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Calendar
        onChange={onChange}
        value={date}
        // tileContent={tileContent}
        minDate={new Date(challenge.startDateTime)}
        maxDate={new Date(challenge.endDateTime)}
        maxDetail="month"
        minDetail="month"
        tileClassName={({ date, view }) => {
          if (challenge.goalType === "daily") {
            if (datesCompleted.find((dDate) => isSameDay(dDate, date))) {
              return "react-calendar__highlight-completed";
            } else if (datesWithData.find((dDate) => isSameDay(dDate, date))) {
              return "react-calendar__highlight";
            } else if (
              date < new Date() &&
              date >= new Date(challenge.startDateTime) &&
              date < new Date(challenge.endDateTime)
            ) {
              return "react-calendar__highlight";
            }
          } else {
            if (datesWithData.find((dDate) => isSameDay(dDate, date))) {
              return "react-calendar__highlight-completed";
            }
          }
        }}
      />
      <TrackProgress
        dailyUserChallenge={
          dailyUserChallenges.find((duc) => isSameDay(duc.date, date)) || null
        }
        userChallenge={userChallenge}
        challenge={challenge}
        date={date}
      />
    </Box>
  );
};

export default CalendarView;
