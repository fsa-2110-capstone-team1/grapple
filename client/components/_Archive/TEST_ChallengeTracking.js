import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import {
  joinChallenge,
  updateChallengeProgress,
  leaveChallenge,
} from "../../store";
import TEST_ConfirmActionDialog from "./TEST_ConfirmActionDialog";
import dateFormat from "dateformat";

export const TestChallengeTracking = () => {
  const { challengeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, userChallenges, challenges } = useSelector((state) => state);

  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [challenge, setChallenge] = useState({});
  const [userChallenge, setUserChallenge] = useState({});

  useEffect(() => {
    const chal = challenges.find((ch) => ch.id === challengeId * 1);
    if (chal) {
      const currentDate = new Date();
      const startDate = new Date(chal.startDateTime);
      const endDate = new Date(chal.endDateTime);
      const challengeStatus =
        currentDate < startDate
          ? "Not Started"
          : currentDate >= startDate && currentDate <= endDate
          ? "In Progress"
          : "Ended";
      setChallenge({
        ...chal,
        status: challengeStatus,
      });
    }
  }, [challengeId, challenges]);

  useEffect(() => {
    if (
      !!userChallenges.find(
        (uc) => uc.challengeId === challengeId * 1 && uc.userId === auth.id
      )
    ) {
      setIsUserParticipant(true);
      setUserChallenge(
        userChallenges.find(
          (uc) => uc.challengeId === challengeId * 1 && uc.userId === auth.id
        )
      );
    } else {
      setIsUserParticipant(false);
      setUserChallenge({});
    }
  }, [auth?.id, userChallenges, challengeId]);

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

  const onSubmit = async (data) => {
    //no need to update if value is 0
    if (Number(data.value)) {
      dispatch(
        updateChallengeProgress({
          userChallengeId: userChallenge.id,
          value: data.value,
        })
      );
    }
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // Justify the content so that CardContent will always be at the top of the card,
          // and CardActions will be at the bottom
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <Box
          component="img"
          sx={{ height: "100px" }}
          src={`/${challenge?.image}`}
          alt="challenge cover photo"
        />
        <Grid>
          <Typography gutterBottom variant="h5" component="div">
            {challenge?.name} (ID: {challenge?.id})
          </Typography>
          <Typography variant="body1" color="text.secondary" height="auto">
            Dates: {dateFormat(challenge?.startDateTime, "mediumDate")} -{" "}
            {dateFormat(challenge?.endDateTime, "mediumDate")}
          </Typography>
          <Typography variant="body1" color="text.secondary" height="auto">
            Status: {challenge?.status}
          </Typography>
          <Typography variant="body2" color="text.secondary" height="auto">
            {challenge?.description}
          </Typography>
          <Typography variant="h6" color="text.secondary" height="auto">
            Goal: {challenge?.targetNumber} {challenge?.targetUnit}
          </Typography>
        </Grid>
        <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
          {isUserParticipant ? (
            <TEST_ConfirmActionDialog
              {...{
                buttonVariant: "contained",
                buttonSize: "small",
                buttonDisabled: challenge.status === "Ended",
                buttonText:
                  challenge.status === "Ended"
                    ? "Challenge Ended"
                    : "Leave Challenge",
                dialogTitle: "Are you sure you want to leave this challenge?",
                dialogText:
                  "This action is permanent. Once you leave the challenge, you will need to re-join and start over.",
                disagreeText: "Cancel",
                agreeText: "Leave Challenge",
                dispatchAction: leaveChallenge,
                dispatchParams: { userChallengeId: userChallenge.id },
              }}
            />
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => dispatch(joinChallenge(auth.id, challengeId))}
            >
              Join Challenge
            </Button>
          )}
        </Box>

        {isUserParticipant && (
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography>Joined On: {userChallenge.createdAt} </Typography>
            <Typography>Status: {userChallenge.status} </Typography>
            <Typography>
              Current Progress: {userChallenge.currentProgress} (
              {(
                (userChallenge.currentProgress / challenge.targetNumber) *
                100
              ).toFixed(1)}
              %)
            </Typography>
            <Divider sx={{ m: 5 }} />
            {challenge.status === "In Progress" && (
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ marginTop: 2 }}
                id="challenge-progress-form"
              >
                <TextField
                  id="value"
                  required
                  variant="outlined"
                  label="Value"
                  type="number"
                  defaultValue={0}
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
                />
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  form="challenge-progress-form"
                  disabled={
                    userChallenge.currentProgress + Number(watch("value")) < 0
                  }
                >
                  Log Progress
                </Button>
                {userChallenge.error?.response.data && (
                  <Typography>{userChallenge.error?.response.data}</Typography>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default TestChallengeTracking;
