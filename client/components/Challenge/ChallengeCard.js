import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import {
  Box,
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
import { joinChallenge } from "../../store";

export const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, userChallenges } = useSelector((state) => state);

  const [isUserParticipant, setIsUserParticipant] = useState(false);

  useEffect(() => {
    if (
      !!userChallenges.find(
        (uc) => uc.challengeId === challenge.id && uc.userId === auth.id
      )
    ) {
      setIsUserParticipant(true);
    }
  }, [auth?.id, userChallenges]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "-webkit-fill-available",
        height: "-webkit-fill-available",
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
      <CardActionArea
        onClick={() => navigate(`/challenges/details/${challenge.id}`)}
      >
        <CardMedia
          component="img"
          height="200"
          image={`/${challenge.image}`}
          alt="challenge cover photo"
          sx={{
            objectFit: "contain",
            marginTop: "20px",
            width: "85%",
            backgroundColor: "#626262",
            borderRadius: "10px",
            marginLeft: "calc(15%/2)",
            padding: "10px",
          }}
        />
        <CardContent>
          <Box
            sx={{
              height: 63.97,
              mb: "1em",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: theme.palette.white.main,
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {challenge.name}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              minWidth: "206px",
              color: theme.palette.white.main,
              mb: "1em",
            }}
            color="text.secondary"
            height="auto"
          >
            <b>Status:</b> {challenge.status}
          </Typography>
          {/* <br /> */}
          <Typography
            variant="body2"
            sx={{
              minWidth: "206px",
              color: theme.palette.white.main,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
            color="text.secondary"
            height="auto"
          >
            {challenge.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
        {challenge.status === "Ended" ? (
          <Button size="small" variant="contained" disabled>
            Challenge Ended
          </Button>
        ) : isUserParticipant ? (
          <Button size="small" variant="contained" disabled>
            <CheckIcon fontSize="small" /> Joined
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(joinChallenge(auth.id, challenge.id))}
          >
            Join Challenge
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default ChallengeCard;
