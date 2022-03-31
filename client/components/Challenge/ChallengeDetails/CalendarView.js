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
  const datesToAddContentTo = dailyUserChallenges.map(
    (duc) => new Date(duc.date)
  );

  //   function tileContent({ date, view }) {
  //     // Add class to tiles in month view only
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (
  //       datesToAddContentTo.find((dDate) => {
  //         return isSameDay(dDate, date);
  //       })
  //     ) {
  //       const dailyTotal = dailyUserChallenges.find((duc) =>
  //         isSameDay(duc.date, date)
  //       ).total;
  //       return ` (${dailyTotal})`;
  //     }
  //   }

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
        minDate={new Date(challenge.startDateTime)} // will not allow date later than today
        maxDate={new Date(challenge.endDateTime)} // will not allow date before 1st July 2015
        maxDetail="month"
        minDetail="month"
        tileClassName={({ date, view }) => {
          if (
            datesToAddContentTo.find((dDate) => {
              return isSameDay(dDate, date);
            })
          ) {
            return "react-calendar__highlight";
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
