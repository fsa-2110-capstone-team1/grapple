import React, { useEffect } from "react";
import AuthForm from "../Auth/AuthForm";
import { Divider, Button, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import MainContent from "./MainContent";
import HomepageLayout from "./HomepageLayout";
import theme from "../../theme";

export const Homepage = () => {
  const userId = useSelector((state) => state.auth.id);

  const runnerImg = "/homeImgs/grapple-bg-home.jpg";

  const location = useLocation();
  const userList = useSelector((state) => state.publicUsers);

  const currUser = userList.find((user) => user.id === userId) || [];
  const userName = currUser.username;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <HomepageLayout
        sxBackground={{
          backgroundImage: `url(${runnerImg})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
          marginTop: "-28px",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          src={runnerImg}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          <strong>Welcome to Grapple</strong>
        </Typography>
        <Divider color="inherit" />
        <Typography
          color="inherit"
          align="center"
          variant="h6"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
          The only place where you get serious about your physical and mental
          health.
        </Typography>
        {!userId ? (
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            href="/signup"
            sx={{ minWidth: 200, mb: "10px" }}
          >
            Register
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            size="large"
            component="a"
            href={`/users/profile/${userName}`}
            sx={{ minWidth: 208, mb: "10px" }}
          >
            View Profile
          </Button>
        )}
        {!userId ? (
          <Button
            color="primary"
            variant="contained"
            size="large"
            component="a"
            href="/login"
            sx={{ minWidth: 200 }}
          >
            Log in
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            size="large"
            component="a"
            href="/challenges"
            sx={{ minWidth: 200 }}
          >
            Browse Challenges
          </Button>
        )}
        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Challenge your friends, challenge yourself.
        </Typography>
      </HomepageLayout>
      <MainContent />
      {!userName ? (
        <Box sx={{ mt: "25px", mb: "25px" }}>
          <AuthForm />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
export default Homepage;
