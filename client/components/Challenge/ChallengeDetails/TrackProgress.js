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
  MenuItem,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../../theme";
import dateFormat from "dateformat";
import { format } from "date-fns";
import {
  updateChallengeProgress,
  createDailyUserChallenge,
  getUserChallenge,
  getDailyUserChallengeStravaActivies,
  addDailyUserChallengeStravaActivies,
  getDailyUserChallenges,
  getAllStravaActivies,
} from "../../../store";

export const TrackProgress = ({
  dailyUserChallenge,
  userChallenge,
  challenge,
  date,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth); //used to fetch all strava activities

  const allStrava = useSelector((state) => state.stravaActivities);
  const dailyLoggedStrava = useSelector(
    (state) => state.dailyUserChallenges.strava
  );

  const [isConnectStrava, setIsConnectStrava] = useState(false);
  useEffect(() => {
    setIsConnectStrava(false);
  }, [date]);

  const [allStravaForDate, setAllStravaForDate] = useState([]);

  useEffect(() => {
    setAllStravaForDate(
      allStrava.filter((act) => {
        return (
          //same date as selected
          format(new Date(date), "MM/dd/yyyy") ===
            format(new Date(act.start_date_local), "MM/dd/yyyy") &&
          //not already linked
          !dailyLoggedStrava.find(
            (ducAct) => ducAct.stravaExternalId === act.external_id
          )
        );
      })
    );
  }, [allStrava, dailyLoggedStrava, date]);

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

  useEffect(async () => {
    if (dailyUserChallenge) {
      setValue(dailyUserChallenge.total);
      await dispatch(
        getDailyUserChallengeStravaActivies(dailyUserChallenge.id)
      );
    } else {
      setValue("0.0");
    }
  }, [JSON.stringify(dailyUserChallenge), date]);

  const onSubmit = async (data) => {
    let newDailyUserChallenge;
    if (!dailyUserChallenge) {
      const newDailyUserChallenge = await dispatch(
        createDailyUserChallenge({
          userChallengeId: userChallenge.id,
          date: date,
          total: Number(data.value),
        })
      );
      let stravaActivity;
      if (!!data.stravaWorkout) {
        stravaActivity = allStravaForDate.find(
          (act) => act.external_id === data.stravaWorkout
        );
        await dispatch(
          addDailyUserChallengeStravaActivies({
            activity: {
              dailyUserChallengeId: newDailyUserChallenge.id,
              stravaExternalId: stravaActivity.external_id,
              startDate: stravaActivity.start_date_local,
              type: stravaActivity.type,
              elapsedTime: stravaActivity.elapsed_time,
              distance: stravaActivity.distance,
            },
            userChallengeId: userChallenge.id,
          })
        );
      }
    } else {
      let stravaActivity;
      if (!!data.stravaWorkout) {
        stravaActivity = allStravaForDate.find(
          (act) => act.external_id === data.stravaWorkout
        );
        await dispatch(
          addDailyUserChallengeStravaActivies({
            activity: {
              dailyUserChallengeId: dailyUserChallenge.id,
              stravaExternalId: stravaActivity.external_id,
              startDate: stravaActivity.start_date_local,
              type: stravaActivity.type,
              elapsedTime: stravaActivity.elapsed_time,
              distance: stravaActivity.distance,
            },
            userChallengeId: userChallenge.id,
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
    }
    // re-fetch the user challenge to get an updated total
    dispatch(getUserChallenge(userChallenge.id));
    reset();
    setIsConnectStrava(false);
  };

  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {!!userChallenge?.id && (
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {challenge.status === "In Progress" && (
            <Box sx={{ width: "100%" }}>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 1,
                }}
                id="challenge-progress-form"
              >
                <Stack
                  sx={{ width: "398px", justifyContent: "center" }}
                  spacing={2}
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

                  {isConnectStrava ? (
                    allStravaForDate.length > 0 ? (
                      <TextField
                        id="stravaWorkout"
                        select
                        label="Strava Activities"
                        defaultValue="0"
                        required
                        {...register("stravaWorkout")}
                        error={!!errors?.stravaWorkout}
                        fullWidth
                      >
                        <MenuItem value={"0"} disabled hidden>
                          Select a Strava Activity
                        </MenuItem>
                        {allStravaForDate.map((act) => (
                          <MenuItem
                            value={act.external_id}
                            key={act.external_id}
                          >
                            {act.type} - Start Time:{" "}
                            {format(
                              new Date(act.start_date_local),
                              "hh:mm:ss aa"
                            )}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <Box
                        sx={{
                          height: "56px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>
                          No Strava workouts found for this date.
                        </Typography>
                      </Box>
                    )
                  ) : user.stravaRefreshToken ? (
                    <Button
                      onClick={() => {
                        if (user.id) {
                          dispatch(
                            getAllStravaActivies({
                              id: user.id,
                              stravaRefreshToken: user.stravaRefreshToken,
                            })
                          );
                          setIsConnectStrava(true);
                        }
                      }}
                    >
                      Select Strava Workout
                    </Button>
                  ) : (
                    <Button disabled>Connect to Strava</Button>
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
                </Stack>
              </Box>
              {dailyLoggedStrava.length > 0 ? (
                <Box sx={{ mt: 1 }}>
                  <Typography>Strava Activities:</Typography>
                  <ul>
                    {dailyLoggedStrava.map((act) => (
                      <li key={act.id}>
                        {act.type}: {act.loggedValue} {act.loggedUnit} (Start
                        Time: {format(new Date(act.startDate), "hh:mm:ss")})
                      </li>
                    ))}
                  </ul>
                </Box>
              ) : (
                ""
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
export default TrackProgress;
