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
  Checkbox,
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
  }, [JSON.stringify(dailyUserChallenge), date]);

  const onSubmit = async (data) => {
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
    // re-fetch the user challenge to get an updated total
    dispatch(getUserChallenge(userChallenge.id));
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
              {challenge.goalType === "total" &&
              challenge.targetUnit === "days" ? (
                <Checkbox
                  id="value"
                  {...register("value")}
                  checked={value === "1" || value === 1 ? true : false}
                  onChange={(e) =>
                    setValue(e.target.checked === true ? "1" : "0")
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              ) : (
                <TextField
                  id="value"
                  required
                  variant="outlined"
                  label="Daily Progress"
                  type="number"
                  {...register("value", {
                    required: "Required field",
                  })}
                  error={Number(watch("value")) < 0}
                  helperText={
                    Number(watch("value")) < 0
                      ? "Total can't be less than 0"
                      : ""
                  }
                  FormHelperTextProps={{
                    style: { color: theme.palette.white.main },
                  }}
                  value={value || 0}
                  inputProps={{
                    style: { color: theme.palette.white.main },
                    step: ".1",
                  }}
                  InputLabelProps={{
                    style: { color: theme.palette.white.main },
                  }}
                  onChange={(e) =>
                    setValue(parseFloat(e.target.value).toFixed(1))
                  }
                />
              )}
              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="challenge-progress-form"
                disabled={Number(watch("value")) < 0}
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
