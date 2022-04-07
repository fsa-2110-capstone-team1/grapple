import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import FlagIcon from "@mui/icons-material/Flag";
import {
  Divider,
  Grid,
  Button,
  Box,
  Paper,
  Typography,
  TextField,
  styled,
} from "@mui/material";
import dateFormat from "dateformat";
import ConfirmActionDialog from "../../../ConfirmActionDialog";
import Details from "./Details";
import JoinChallenge from "./JoinChallenge";
import UserChallengeWrapper from "./UserChallengeWrapper";
import theme from "../../../theme";
import { getDailyUserChallenges } from "../../../store";
import ParticipantsTable from "../ChallengeDetails/ParticipantsTable";

export const ChallengeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This is the challenge id.
  const { id } = useParams();
  const location = useLocation();

  const { challenges, publicUsers, userChallenges, auth, dailyUserChallenges } =
    useSelector((state) => state);

  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [challenge, setChallenge] = useState({});
  const [userChallenge, setUserChallenge] = useState({});
  const [challengeImg, setChallengeImg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (publicUsers?.length > 0) {
      setEnrolledUsers(
        userChallenges
          .filter((userChallenge) => userChallenge.challengeId === id * 1)
          ?.map((chall) =>
            publicUsers.find((publicUser) => publicUser.id === chall.userId)
          )
      );
    }
  }, [id, publicUsers, challenges, userChallenges]);

  useEffect(() => {
    const chal = challenges.find((ch) => ch.id === id * 1);
    if (chal) {
      const currentDate = new Date();
      const startDate = new Date(chal.startDateTime);
      const endDate = new Date(chal.endDateTime);
      const challengeStatus =
        currentDate < startDate
          ? "Not Started"
          : currentDate >= startDate && currentDate <= endDate
          ? "In Progress"
          : "Ended";
      setChallenge({
        ...chal,
        status: challengeStatus,
      });
      console.log("chal", chal);
      setChallengeImg(`/homeImgs/${chal.category}-challenge-bg.jpeg`);
    }
  }, [id, challenges]);

  useEffect(() => {
    if (
      !!userChallenges.find(
        (uc) => uc.challengeId === id * 1 && uc.userId === auth.id
      )
    ) {
      setUserChallenge(
        userChallenges.find(
          (uc) => uc.challengeId === id * 1 && uc.userId === auth.id
        )
      );
    } else {
      setUserChallenge({});
    }
  }, [auth?.id, userChallenges, id]);

  useEffect(async () => {
    if (userChallenge.id) {
      const dailyUserChallenges = await dispatch(
        getDailyUserChallenges(userChallenge.id)
      );
    }
  }, [userChallenge.id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxWidth: "100vw",
        mb: "20px",
      }}
    >
      {/* main page */}
      <Grid
        container
        direction="column"
        spacing={3}
        sx={{
          // backgroundColor: theme.palette.braun.main,
          color: theme.palette.white.main,
        }}
      >
        {/* hero image */}
        <Grid
          item
          xs={3}
          sx={{
            overflow: "hidden",
            height: 100,
            width: "100%",
            position: "relative",
            paddingBottom: "80px",
          }}
        >
          <Box
            component="img"
            src={challengeImg}
            sx={{
              width: 1,
              minWidth: 1,
              maxHeight: "30vh",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.8,
              zIndex: 1,
            }}
          />
          <Box
            key={challenge.id}
            component="img"
            src={`/${challenge.image}`}
            sx={[
              {
                borderRadius: "20px",
                width: "215px",
                border: "7px solid #4AB5A3",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#f2edeb",
                position: "absolute",
                position: "absolute",
                top: 165,
                left: "40%",
                zIndex: 2,
              },
            ]}
          />
        </Grid>

        {/* main section */}
        <Grid item xs={5} container>
          {/* Left railing */}
          <Grid item xs={1} />
          {/* Middle section */}
          <Grid
            item
            xs={10}
            container
            direction="column"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            {/* title */}
            <Grid item sx={{ textAlign: "center" }}>
              <Typography variant="h3">{challenge.name}</Typography>
              <Divider />
            </Grid>

            {/* main description section */}
            <Grid item container spacing={2} sx={{ alignItems: "center" }}>
              {/* Left railing */}
              <Grid
                item
                xs={0}
                md={0.5}
                // sx={{ mr: "60px" }}
              />

              {/* Left details section */}
              <Grid item xs={12} md={5.5} sx={{ mt: 2, mb: 2 }}>
                <Details challenge={challenge} enrolledUsers={enrolledUsers} />
              </Grid>

              {/* Right join challenge section */}
              <Grid
                item
                xs={12}
                md={5.5}
                sx={{
                  height: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  mt: 2,
                  mb: 2,
                }}
              >
                <JoinChallenge
                  challenge={challenge}
                  userChallenge={userChallenge}
                  enrolledUsers={enrolledUsers}
                  userId={auth?.id}
                />
              </Grid>

              {/* Right railing */}
              <Grid item xs={0} md={0.5} />
            </Grid>

            {challenge.status === "In Progress" && userChallenge.id ? (
              <>
                <Grid item sx={{ width: "80vw" }}>
                  <Divider />
                </Grid>

                {/* Track challenge progress section */}
                <Grid item xs={4} container sx={{ alignItems: "center" }}>
                  {/* Left railing */}
                  <Grid item xs={0.5} md={0.5} sx={{ mr: "60px" }} />

                  <Grid item xs={10}>
                    <UserChallengeWrapper
                      dailyUserChallenges={dailyUserChallenges}
                      challenge={challenge}
                      userChallenge={userChallenge}
                      enrolledUsers={enrolledUsers}
                    />
                  </Grid>

                  {/* Right railing */}
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
          {/* Right railing */}
          <Grid item xs={1} />
        </Grid>
        <Grid item xs={0.5} md={0.5} />
      </Grid>
    </Box>
  );
};
export default ChallengeDetails;
