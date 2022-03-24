import React, { useEffect } from 'react';
import AuthForm from './Auth/AuthForm';
import {
  Divider,
  Grid,
  Container,
  Button,
  Box,
  Paper,
  Typography,
  TextField,
  styled,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';

const ProductHeroLayoutRoot = styled('section')(({ theme }) => ({
  color: theme.palette.white.main,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '80vh',
    minHeight: 500,
    maxHeight: 1300,
  },
}));

const Background = styled(Box)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  zIndex: -2,
});

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductHeroLayout(props) {
  const { sxBackground, children } = props;

  return (
    <ProductHeroLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <img
          src="/static/themes/onepirate/productHeroWonder.png"
          alt="wonder"
          width="147"
          height="80"
        /> */}
        {children}
        <Box
          sx={{
            marginTop: '-28px',
            // marginBottom: '100px',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
        <Box
          component="img"
          src="/logo/Grapple-logos_transparent.png"
          height="125px"
          width="125px"
          alt="grapple logo"
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
            position: 'absolute',
            bottom: 35,
          }}
        />
      </Container>
    </ProductHeroLayoutRoot>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export const Home = () => {
  const userId = useSelector((state) => state.auth.id);

  const runnerImg = '/homeImgs/grapple-home-runner.jpeg';

  const location = useLocation();
  const userList = useSelector((state) => state.publicUsers);

  const currUser = userList.find((user) => user.id === userId) || [];
  const userName = currUser.username;

  // console.log('here the list', userList);
  // console.log('here the user you want', userName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <ThemeProvider theme={theme}>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${runnerImg})`,
          backgroundColor: '#7fc7d9', // Average color of the background image.
          backgroundPosition: 'center',
          marginTop: '-28px',
          // marginBottom: '100px',
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: 'none' }}
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
            sx={{ minWidth: 200, mb: '10px' }}
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
            sx={{ minWidth: 200, mb: '10px' }}
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
      </ProductHeroLayout>
      <Box
        component="section"
        sx={{
          display: 'flex',
          overflow: 'hidden',
          // bgcolor: theme.palette.white.main,
        }}
      >
        <Container
          sx={{
            mt: 15,
            mb: 30,
            display: 'flex',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            // src="/static/themes/onepirate/productCurvyLines.png"
            // alt="curvy lines"
            sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ height: 55 }}
                  component="img"
                  // PERSON ICON
                  src="https://www.nicepng.com/png/full/3-30788_blue-brain-it-mental-healh-icon-png.png"

                  // BRAIN ICON
                  // src="https://www.nicepng.com/png/full/309-3095928_mind-icongoteam2015-04-29t20-brain-icon.png"
                >
                  {/* <PsychologyIcon fontSize="large" /> */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: '15px',
                    borderRadius: '25px',
                  }}
                >
                  Mental
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: '30px',
                    borderRadius: '25px',
                  }}
                >
                  {'Mental health is key to overall happiness and well being.'}

                  {
                    ' Reading, Mediation, and Sleep will benefit you in the long run.'
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ height: 55 }}
                  component="img"
                  src="https://www.nicepng.com/png/full/785-7854655_more-exercise-after-heart-attack-linked-to-lower.png"
                >
                  {/* <FitnessCenterIcon fontSize="large" /> */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.primary.main,
                    padding: '15px',
                    borderRadius: '25px',
                  }}
                >
                  Physical
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: '30px',
                    borderRadius: '25px',
                  }}
                >
                  {'Physical health is important to keep your body strong.'}

                  {
                    ' Running, biking, and lifting will keep you in tip top shape.'
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  sx={{ height: 55 }}
                  component="img"
                  src="https://www.nicepng.com/png/full/799-7998911_placeholder-health-icons-png.png"
                >
                  {/* <HealthAndSafetyIcon fontSize="large" /> */}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: '15px',
                    borderRadius: '25px',
                  }}
                >
                  All around health
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: '30px',
                    borderRadius: '25px',
                  }}
                >
                  {'Doing whats best for your well being is so important. '}
                  {
                    ' Share goals with your friends and family to keep yourself motivated.'
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Home;
