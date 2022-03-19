import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();

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
      <CardMedia
        component="img"
        height="200"
        image={`/${challenge.image}`}
        alt="challenge cover photo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {challenge.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" height="auto">
          {challenge.description}
        </Typography>
      </CardContent>
      <CardActions>
        {isUserParticipant ? (
          <Button size="small" disabled>
            <CheckIcon fontSize="small" /> Joined
          </Button>
        ) : (
          <Button size="small">Join Challenge</Button>
        )}
        <Button
          size="small"
          onClick={() => navigate(`/challenges/${challenge.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
export default ChallengeCard;
