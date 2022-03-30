import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import theme from "../../theme";

const UserBadges = ({ challenges }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      {challenges
        .filter((ch) => ch.status === "Completed")
        .map((challenge) => (
          <Grid item key={challenge.id}>
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
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            />
          </Grid>
        ))}
    </Grid>
  );
};
export default UserBadges;
