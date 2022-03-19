import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Paper,
  styled,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { getAllChallenges } from '../../store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? '#1A2027' : theme.palette.secondary.main,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.braun,
}));

export const ChallengeDetails = () => {
  const challenges = useSelector((state) => state.challenges);
  // const state = useSelector((state) => state);
  // console.log('STATE', state);

  const { id } = useParams();

  const userChallenges = useSelector((state) => state.userChallenges);
  const currUserChall =
    userChallenges.filter((userChallenge) => userChallenge.userId === id * 1) ||
    [];

  const challenge =
    challenges.find((challenge) => challenge.id === id * 1) || {};

  console.log('challenge', challenge);
  if (!challenge) {
    return 'Sorry the challenge you are looking for is unreachable';
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="meditate-img-div">
          {/* <img
          className="meditate-img"
          src="../homeImgs/grapple-cycle-group.jpeg"
        /> */}
        </div>
        <div className="single-challenge-div">
          <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 12">
                <Item xs={12}>
                  <h1>Challenge: {challenge.name}</h1>
                </Item>
              </Box>
              <Box gridColumn="span 12">
                <Item>
                  <h2>Difficulty Rating: {challenge.difficulty}</h2>
                </Item>
              </Box>
              <Box gridColumn="span 12">
                <Item>
                  {' '}
                  <h2>{challenge.description}</h2>
                </Item>
              </Box>
              <Box gridColumn="span 6">
                <Item>
                  <h4>Start Date: {challenge.startDateTime}</h4>
                </Item>
              </Box>
              <Box gridColumn="span 6">
                <Item>
                  <h4>End Date: {challenge.endDateTime}</h4>
                </Item>
              </Box>
              <Box gridColumn="span 12">
                <Item>
                  <h4>
                    {currUserChall.length === 0
                      ? 'No one currently enrolled in this challenge :('
                      : currUserChall.length === 1
                      ? `There is only ${currUserChall.length} person enrolled in this challenge!`
                      : ` There are ${currUserChall.length} people enrolled in this challenge!`}
                  </h4>
                </Item>
              </Box>
            </Box>
          </Box>
          <div className="single-challenge-bttns">
            <Button size="large">Join Challenge</Button>
            <Button size="large">Invite A friend</Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ChallengeDetails;
