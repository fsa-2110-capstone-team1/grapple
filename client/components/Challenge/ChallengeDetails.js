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
import theme from "../../theme";
import dateFormat from "dateformat";
import {
  getAllChallenges,
  joinChallenge,
  updateChallengeProgress,
  leaveChallenge,
} from "../../store";
import ConfirmActionDialog from "../../ConfirmActionDialog";

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
      <div className="bike-img-div"></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ alignItems: "center" }}
        >
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="h3" sx={{ margin: "40px" }}>
              Challenge: {challenge.name}
            </Typography>
            <Divider />
          </Grid>
          <Grid item container spacing={6} sx={{ alignItems: "center" }}>
            {/* Grid item below is left railing */}

            <Grid item xs={1} md={2} sx={{ textAlign: "right" }}></Grid>
            <Grid item xs={10} md={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DescriptionIcon className="description-icon" />
                <Typography variant="p">
                  Overview: {challenge.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SportsMmaIcon className="boxing-icon" />
                <h4>Difficulty Rating: {challenge.difficulty}</h4>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DateRangeIcon className="date-range-icon" />
                <p>
                  Start Date:{" "}
                  {dateFormat(challenge.startDateTime, "mediumDate")}
                </p>

                {/* </Paper> */}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DateRangeIcon className="date-range-icon" />
                <p>
                  End Date: {dateFormat(challenge.endDateTime, "mediumDate")}
                </p>
              </Box>
            </Grid>
            <Grid item xs={1.5} />
            <Grid
              item
              container
              direction="column"
              xs={10}
              md={4}
              sx={{ pl: "40px" }}
            >
              <Grid item>
                <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
                  {!!userChallenge.id ? (
                    <ConfirmActionDialog
                      {...{
                        buttonVariant: "contained",
                        buttonSize: "large",
                        buttonDisabled: challenge.status === "Ended",
                        buttonText:
                          challenge.status === "Ended"
                            ? "Challenge Ended"
                            : "Leave Challenge",
                        dialogTitle:
                          "Are you sure you want to leave this challenge?",
                        dialogText:
                          "This action is permanent. Once you leave the challenge, you will need to re-join and start over.",
                        disagreeText: "Cancel",
                        agreeText: "Leave Challenge",
                        dispatchAction: leaveChallenge,
                        dispatchParams: { userChallengeId: userChallenge.id },
                        buttonSx: {
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          backgroundColor: theme.palette.secondary.main,
                          color: theme.palette.braun.main,
                        },
                      }}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.braun.main,
                      }}
                      onClick={() => dispatch(joinChallenge(auth.id, id))}
                    >
                      Join Challenge
                    </Button>
                  )}
                </Box>
              </Grid>
              {/* <Button size="large">Invite A friend</Button> */}
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "left",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  {enrolledUsers.length === 0 ? (
                    <SentimentVeryDissatisfiedIcon className="sad-face-icon" />
                  ) : (
                    <ElectricBoltIcon className="electric-bolt" />
                  )}
                  <Typography variant="p">
                    {enrolledUsers.length === 0
                      ? "No one currently enrolled in this challenge."
                      : enrolledUsers.length === 1
                      ? `${enrolledUsers.length} person enrolled in this challenge!`
                      : `${enrolledUsers.length} people enrolled in this challenge!`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                {enrolledUsers.length >= 1 ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DirectionsRunIcon className="runner-icon" />
                    <p className="participant-div">Participants</p>
                  </Box>
                ) : (
                  ""
                )}
                <Box>
                  {enrolledUsers.length >= 1
                    ? enrolledUsers?.map((user) => (
                        <Link
                          key={user.id}
                          to={`/users/profile/${user.username}`}
                        >
                          <li className="user-link-li">{user.username}</li>
                        </Link>
                      ))
                    : ""}
                </Box>
              </Grid>
            </Grid>
            {/* Grid item below is right railing */}
            <Grid item xs={0.5} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default ChallengeDetails;
