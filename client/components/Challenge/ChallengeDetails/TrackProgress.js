import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
import dateFormat from "dateformat";
import { updateChallengeProgress } from "../../../store";

export const TrackProgress = ({ userChallenge, challenge }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
    },
    reset,
  } = useForm();

  // controlling value field to allow decimals
  const [value, setValue] = useState("0.0");

  const onSubmit = async (data) => {
    //no need to update if value is 0
    if (Number(data.value)) {
      dispatch(
        updateChallengeProgress({
          userChallengeId: userChallenge.id,
          value: Number(data.value),
        })
      );
    }
    reset();
    setValue("0.0");
  };

  return (
    <ThemeProvider theme={theme}>
      {!!userChallenge.id && (
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Track Your Progress
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <b>Joined On:</b>{" "}
                {dateFormat(userChallenge.createdAt, "mediumDate")}
              </Typography>
              <Typography>
                <b>Status:</b> {userChallenge.status}{" "}
                {userChallenge.status === "Completed" && "👑"}
              </Typography>
              <Typography>
                <b>Current Progress:</b> {userChallenge.currentProgress} (
                {(
                  (userChallenge.currentProgress / challenge.targetNumber) *
                  100
                ).toFixed(1)}
                %)
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              {challenge.status === "In Progress" && (
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  id="challenge-progress-form"
                >
                  <TextField
                    id="value"
                    required
                    variant="outlined"
                    label="Value"
                    type="number"
                    {...register("value", {
                      required: "Required field",
                    })}
                    error={
                      userChallenge.currentProgress + Number(watch("value")) < 0
                    }
                    helperText={
                      userChallenge.currentProgress + Number(watch("value")) < 0
                        ? "Current progress total can't be less than 0"
                        : "Use negative numbers to backtrack progress"
                    }
                    value={value}
                    inputProps={{
                      // maxLength: 3,
                      step: ".1",
                    }}
                    onChange={(e) =>
                      setValue(parseFloat(e.target.value).toFixed(1))
                    }
                  />
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    form="challenge-progress-form"
                    disabled={
                      userChallenge.currentProgress + Number(watch("value")) < 0
                    }
                    sx={{ height: "80%" }}
                  >
                    Submit
                  </Button>
                  {userChallenge.error?.response.data && (
                    <Typography>
                      {userChallenge.error?.response.data}
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
};
export default TrackProgress;
