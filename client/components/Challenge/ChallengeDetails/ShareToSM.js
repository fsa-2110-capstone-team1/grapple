import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

export const ShareToSM = ({ challenge }) => {
  const { userChallenges, challenges } = useSelector((state) => state);

  const user = useSelector((state) => state.auth) || {};

  const [myChallenges, setMyChallenges] = useState([]);
  const [completedChallenge, setCompletedChallenge] = useState({});

  useEffect(() => {
    const myChal = userChallenges
      ?.filter((uc) => uc.userId === user?.id)
      .map((uc) => ({
        ...challenges.find((challenge) => challenge.id === uc.challengeId),
        status: uc.status,
      }));
    setMyChallenges(myChal);
  }, [userChallenges, challenges, user?.id]);

  useEffect(() => {
    const completed = myChallenges
      .filter((ch) => ch.status === "Completed")
      .find((ch) => ch.id === challenge.id);
    setCompletedChallenge(completed);
  }, [myChallenges]);

  return (
    <Grid sx={{ display: "contents" }}>
      {completedChallenge ? (
        <Card
          sx={{
            maxWidth: "222px",
            display: "flex",
            justifyContent: "center",
            margin: "9px",
            padding: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ marginLeft: "7px" }}
              >
                Share your achievements:
              </Typography>
            </Grid>

            <Grid
              item
              sx={{ marginButton: "15px", display: "grid" }}
              item
              xs={6}
            >
              <FacebookShareButton
                quote={`I did it!!! - ${challenge.name}`}
                hashtag="#grapple"
                url={`http://www.grapple.com/challenges/details/${challenge.id}`}
              >
                <FacebookIcon fontSize="large" color="action" />
              </FacebookShareButton>
            </Grid>
            <Grid
              item
              sx={{ marginButton: "15px", display: "grid" }}
              item
              xs={6}
            >
              <TwitterShareButton
                title={`I did it!!! - ${challenge.name}`}
                hashtag="#grapple"
                url={`http://www.grapple.com/challenges/details/${challenge.id}`}
              >
                <TwitterIcon fontSize="large" />
              </TwitterShareButton>
            </Grid>
          </Grid>
        </Card>
      ) : (
        ""
      )}
    </Grid>
  );
};
export default ShareToSM;
