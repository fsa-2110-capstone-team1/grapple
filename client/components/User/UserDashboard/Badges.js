import React from "react";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Badges = ({ myChallenges }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid item container direction="column" spacing={2}>
        <Grid item container>
          {myChallenges
            .filter((ch) => ch.status === "Completed")
            .map((challenge) => (
              <Grid
                item
                key={challenge.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                container
                flexDirection="column"
                alignItems="center"
                minWidth="145px"
              >
                {/* <Link to={`/challenges/${challenge.id}`}> */}
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
      </Grid>
    </Box>
  );
};
export default Badges;
