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
          }}
        >
          <Box
            component="img"
            src="/homeImgs/grapple-cycle-group.jpeg"
            sx={{
              width: 1,
              minWidth: 1,
              maxHeight: "30vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
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
              <Grid item xs={12} md={5.5}>
                <Details challenge={challenge} />
              </Grid>

              {/* Right join challenge section */}
              <Grid item xs={12} md={5.5}>
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
                    />
                  </Grid>

                  {/* Right railing */}
                  <Grid item xs={0.5} md={0.5} />
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
          {/* Right railing */}
          <Grid item xs={1} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ChallengeDetails;
