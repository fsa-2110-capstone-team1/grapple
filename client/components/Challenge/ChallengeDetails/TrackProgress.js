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
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../../theme";
import dateFormat from "dateformat";
import {
  updateChallengeProgress,
  createDailyUserChallenge,
  getUserChallenge,
} from "../../../store";

export const TrackProgress = ({
  dailyUserChallenge,
  userChallenge,
  challenge,
  date,
}) => {
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

  useEffect(() => {
    if (dailyUserChallenge) {
      setValue(dailyUserChallenge.total);
    } else {
      setValue("0.0");
    }
  }, [JSON.stringify(dailyUserChallenge)]);

  const onSubmit = async (data) => {
    //no need to update if value is 0
    if (Number(data.value)) {
      if (!dailyUserChallenge) {
        await dispatch(
          createDailyUserChallenge({
            userChallengeId: userChallenge.id,
            date: date,
            total: Number(data.value),
          })
        );
      } else {
        await dispatch(
          updateChallengeProgress({
            dailyUserChallengeId: dailyUserChallenge.id,
            value: Number(data.value),
          })
        );
      }
      dispatch(getUserChallenge(userChallenge.id));
    }
    reset();
  };

  return (
    <>
      {!!userChallenge?.id && (
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {challenge.status === "In Progress" && (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
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
                error={dailyUserChallenge?.total + Number(watch("value")) < 0}
                helperText={
                  dailyUserChallenge?.total + Number(watch("value")) < 0
                    ? "Total can't be less than 0"
                    : "Use negative numbers to backtrack progress"
                }
                FormHelperTextProps={{
                  style: { color: theme.palette.white.main },
                }}
                value={value || 0}
                inputProps={{
                  style: { color: theme.palette.white.main },
                  // maxLength: 3,
                  step: ".1",
                }}
                InputLabelProps={{
                  style: { color: theme.palette.white.main },
                }}
                onChange={(e) =>
                  setValue(parseFloat(e.target.value).toFixed(1))
                }
              />
              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="challenge-progress-form"
                disabled={
                  dailyUserChallenge?.total + Number(watch("value")) < 0
                }
                sx={{ height: "80%", m: 1.5, mr: 0 }}
              >
                Submit
              </Button>
              {dailyUserChallenge?.error?.response.data && (
                <Typography>
                  {dailyUserChallenge?.error?.response.data}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
export default TrackProgress;
