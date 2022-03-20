import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import { joinChallenge } from "../../store";

export const TestChallengeTracking = () => {
  const { challengeId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, userChallenges, challenges } = useSelector((state) => state);

  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [challenge, setChallenge] = useState({});
  const [userChallenge, setUserChallenge] = useState({});

  useEffect(() => {
    setChallenge(challenges.find((ch) => ch.id === challengeId * 1));
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
    }
  }, [auth?.id, userChallenges, challengeId]);

  console.log(challenge);
  console.log(userChallenge);

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
          <Typography variant="body2" color="text.secondary" height="auto">
            {challenge?.description}
          </Typography>
          <Typography variant="h6" color="text.secondary" height="auto">
            Goal: {challenge?.targetNumber} {challenge?.targetUnit}
          </Typography>
        </Grid>
        <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
          {isUserParticipant ? (
            <Button size="small" variant="contained" disabled>
              <CheckIcon fontSize="small" /> Joined
            </Button>
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
              Current Progress: {userChallenge.currentProgress}
            </Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default TestChallengeTracking;
