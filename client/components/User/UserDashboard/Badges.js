import React from "react";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Badges = ({ challenges }) => {
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      {challenges
        .filter((ch) => ch.status === "Completed")
        .map((challenge) => (
          <Grid
            item
            key={challenge.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "145px",
            }}
          >
            <Box
              key={challenge.id}
              component="img"
              src={`/${challenge.image}`}
              sx={[
                {
                  borderRadius: "50px",
                  width: "80px",
                  border: "3px solid #c54c7b",
                  padding: "5px",
                },
                {
                  "&:hover": {
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  },
                },
              ]}
              onClick={() => navigate(`/challenges/details/${challenge.id}`)}
            />
            <Typography variant="body2">
              {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                new Date(challenge.startDateTime)
              )}{" "}
              Challenge
            </Typography>
            <Typography variant="subtitle1">
              {new Date(challenge.startDateTime).getFullYear()}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};
export default Badges;
