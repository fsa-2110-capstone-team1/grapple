import React from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import ChallengeCard from "./ChallengeCard";

export const BrowseChallenges = () => {
  const challenges = useSelector((state) => state.challenges);

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10} container>
        {challenges.map((challenge) => (
          <Grid item key={challenge.id} xs={12} sm={6} md={4} lg={3} container>
            <ChallengeCard key={challenge.id} challenge={challenge} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};
export default BrowseChallenges;
