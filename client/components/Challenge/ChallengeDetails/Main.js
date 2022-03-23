import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme";
import dateFormat from "dateformat";
import {
  getAllChallenges,
  joinChallenge,
  updateChallengeProgress,
  leaveChallenge,
} from "../../../store";
import ConfirmActionDialog from "../../../ConfirmActionDialog";
import Details from "./Details";
import JoinChallenge from "./JoinChallenge";

export const ChallengeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This is the challenge id.
  const { id } = useParams();

  const { challenges, publicUsers, userChallenges, auth } = useSelector(
    (state) => state
  );

  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [challenge, setChallenge] = useState({});
  const [userChallenge, setUserChallenge] = useState({});

  useEffect(() => {
    setEnrolledUsers(
      userChallenges
        .filter((userChallenge) => userChallenge.challengeId === id * 1)
        ?.map((chall) =>
          publicUsers.find((publicUser) => publicUser.id === chall.userId)
        )
    );
  }, [id, publicUsers, challenges]);

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

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={3}>
          <Box
            component="img"
            src="/homeImgs/grapple-cycle-group.jpeg"
            sx={{
              width: 1,
              marginTop: "-28px",
              maxHeight: "30vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction="column"
            spacing={2}
            sx={{ alignItems: "center" }}
          >
            <Grid item sx={{ textAlign: "center" }}>
              <Typography variant="h3">Challenge: {challenge.name}</Typography>
              <Divider />
            </Grid>
            <Grid item container spacing={20} sx={{ alignItems: "center" }}>
              {/* Left railing */}
              <Grid item xs={0.5} md={0.5} />

              {/* Left details section */}
              <Grid item xs={10} md={5}>
                <Details challenge={challenge} />
              </Grid>

              {/* Middle Space */}
              {/* <Grid item xs={1.5} /> */}

              {/* Right join challenge section */}
              <Grid item xs={10} md={5}>
                <JoinChallenge
                  challenge={challenge}
                  userChallenge={userChallenge}
                  enrolledUsers={enrolledUsers}
                />
              </Grid>

              {/* Right railing */}
              <Grid item xs={0.5} md={0.5} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ChallengeDetails;
