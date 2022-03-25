import React, { useEffect } from 'react';
import { Container, Box, styled } from '@mui/material';
import PropTypes from 'prop-types';

const HomepageLayoutRoot = styled('section')(({ theme }) => ({
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

export function HomepageLayout(props) {
  const { sxBackground, children } = props;

  return (
    <HomepageLayoutRoot>
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
        <Box
          sx={{
            marginTop: '-28px',
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
    </HomepageLayoutRoot>
  );
}

HomepageLayout.propTypes = {
  children: PropTypes.node,
  sxBackground: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default HomepageLayout;
