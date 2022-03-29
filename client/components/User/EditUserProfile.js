import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Card, CardMedia } from "@mui/material";
import { UserProfileForm } from "./UserProfileForm";
import LinearProgress from "@mui/material/LinearProgress";

export const EditUserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  //making fields in the form populated on refreshing the page
  useEffect(() => {
    if (userProfile.id) {
      setData(userProfile);
    }
  }, [userProfile]);

  return (
    <Box className="profile-container">
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={3}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          xs={6}
        >
          <Grid item className="image-stack">
            <img
              id="profile-header"
              src="/homeImgs/grapple-home-runner.jpeg"
              alt="background-image"
            />
            {userProfile.image ? (
              <img id="profile-image" src={userProfile.image} />
            ) : (
              <i
                className="material-icons"
                id="profile-image"
                style={{
                  marginTop: "20px",
                  fontSize: "155px",
                  color: "#dfdfdf",
                }}
              >
                face
              </i>
            )}
            {data ? (
              <UserProfileForm preloadedValues={data} />
            ) : (
              <LinearProgress sx={{ marginTop: "50px" }} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default EditUserProfile;
