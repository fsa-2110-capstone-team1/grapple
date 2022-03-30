import React, { useState } from "react";
import Calendar from "react-calendar";
import { differenceInCalendarDays, parseISO } from "date-fns";

const CalendarView = ({ dailyUserChallenges, challenge }) => {
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
    <>
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
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
      <p className="text-center">
        <span className="bold">Daily Total:</span>{" "}
        {dailyUserChallenges.find((duc) => isSameDay(duc.date, date))?.total}
      </p>
    </>
  );
};

export default CalendarView;
