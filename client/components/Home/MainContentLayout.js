import React, { useEffect } from 'react';
import { Container, Box, styled } from '@mui/material';

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

const MainContentRoot = styled('section')(({ theme }) => ({
  color: theme.palette.white.main,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    height: '150vh',
    minHeight: 500,
    maxHeight: 1300,
  },
  [theme.breakpoints.up('md')]: {
    height: '150vh',
  },
  [theme.breakpoints.up('lg')]: {
    height: '100vh',
  },
}));

function MainContentLayout(props) {
  const { sxBackground, children } = props;
  return (
    <MainContentRoot>
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
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'common.white',
            opacity: 0.8,
            zIndex: -1,
          }}
        />
        <Background sx={sxBackground} />
      </Container>
    </MainContentRoot>
  );
}

export default MainContentLayout;
