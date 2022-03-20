import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
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

  useEffect(() => {
    setChallenge(challenges.find((ch) => ch.id === challengeId * 1));
  }, [challengeId, challenges]);

  useEffect(() => {
    if (
      !!userChallenges.find(
        (uc) => uc.challengeId === challengeId && uc.userId === auth.id
      )
    ) {
      setIsUserParticipant(true);
    }
  }, [auth?.id, userChallenges, challengeId]);

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 345,
          // Provide some spacing between cards
          margin: 1.5,
          // Use flex layout with column direction for components in the card
          // (CardContent and CardActions)
          display: "flex",
          flexDirection: "column",
          // Justify the content so that CardContent will always be at the top of the card,
          // and CardActions will be at the bottom
          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={() => navigate(`/challenges/${challengeId}`)}>
          <CardMedia
            component="img"
            height="200"
            image={`/${challenge?.image}`}
            alt="challenge cover photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {challenge?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" height="auto">
              {challenge?.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
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
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};
export default TestChallengeTracking;
