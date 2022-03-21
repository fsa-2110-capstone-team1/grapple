import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Card, CardMedia } from "@mui/material";
import { UserSettingsForm } from "./UserSettingsForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import LinearProgress from '@mui/material/LinearProgress';

export const UserSettings = () => {
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
    <ThemeProvider theme={theme}>
      <Box className="profile-container">
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
        >
          
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} xs={6}>
            
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
                <UserSettingsForm preloadedValues={data} />
              ) : (
                <LinearProgress sx={{ marginTop: "50px" }}/>
              )}
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default UserSettings;
