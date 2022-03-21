import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import DescriptionIcon from '@mui/icons-material/Description';
import { Divider, Grid, Button, Box, Paper, styled } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { getAllChallenges } from '../../store';

export const ChallengeDetails = () => {
  const challenges = useSelector((state) => state.challenges);

  const publicUsers = useSelector((state) => state.publicUsers);

  // This is the challenge id.
  const { id } = useParams();

  const userChallenges = useSelector((state) => state.userChallenges);

  const [enrolledUsers, setEnrolledUsers] = useState([]);

  useEffect(() => {
    setEnrolledUsers(
      userChallenges
        .filter((userChallenge) => userChallenge.challengeId === id * 1)
        ?.map((chall) =>
          publicUsers.find((publicUser) => publicUser.id === chall.userId)
        )
    );
  }, [id, publicUsers, challenges]);

  // const userNames = enrolledUsers?.map((user) => user?.username);

  const challenge =
    challenges.find((challenge) => challenge.id === id * 1) || {};

  if (!challenge) {
    return 'Sorry the challenge you are looking for is unreachable';
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="bike-img-div"></div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="column"
          spacing={2}
          sx={{ alignItems: 'center' }}
        >
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <h1>Challenge: {challenge.name}</h1>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button size="large">Join Challenge</Button>
            <Button size="large">Invite A friend</Button>
          </Grid>

          <Grid
            item
            container
            spacing={2}
            xs={12}
            sx={{ alignItems: 'center' }}
          >
            <Grid item xs={1} sx={{ textAlign: 'right' }}></Grid>
            <Grid item xs={3}>
              <div className="description-icon-div">
                <DescriptionIcon className="description-icon" />
                <p>Overview: {challenge.description}</p>
              </div>
              <div className="boxing-icon-div">
                <SportsMmaIcon className="boxing-icon" />
                <h4>Difficulty Rating: {challenge.difficulty}</h4>
              </div>
              <div className="enrolled-div">
                {enrolledUsers.length === 0 ? (
                  <SentimentVeryDissatisfiedIcon className="sad-face" />
                ) : (
                  <ElectricBoltIcon className="electric-bolt" />
                )}
                <p>
                  {enrolledUsers.length === 0
                    ? 'No one currently enrolled in this challenge.'
                    : enrolledUsers.length === 1
                    ? `${enrolledUsers.length} person enrolled in this challenge!`
                    : `${enrolledUsers.length} people enrolled in this challenge!`}
                </p>
              </div>
              {enrolledUsers.length >= 1 ? (
                <div className="runner-icon-div">
                  <DirectionsRunIcon className="runner-icon" />
                  <p className="participant-div">Participants</p>
                </div>
              ) : (
                ''
              )}
              <div>
                {enrolledUsers.length >= 1
                  ? enrolledUsers?.map((user) => (
                      <Link
                        key={user.id}
                        to={`/users/profile/${user.username}`}
                      >
                        <li className="user-link-li">{user.username}</li>
                      </Link>
                    ))
                  : ''}
              </div>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Paper
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.white.main,
                }}
              >
                <p>Start Date: {challenge.startDateTime}</p>
              </Paper>
              <Paper
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.white.main,
                }}
              >
                <p>End Date: {challenge.endDateTime}</p>
              </Paper>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default ChallengeDetails;
