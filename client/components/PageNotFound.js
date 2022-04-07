import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';

export const PageNotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box sx={{ minHeight: '100vh', marginTop: '150px', paddingBottom: '40px' }}>
      <Grid container direction="column">
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="img"
            src="/homeImgs/pagenotfound.webp"
            sx={{
              width: {
                xs: '440px',
                md: '600px',
              },
            }}
          ></Box>
        </Grid>
      </Grid>
      {/* Button Start */}
      <Grid container direction="column" sx={{ marginTop: '40px' }}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component="a"
              href="/"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '25px',
              }}
            >
              Return Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PageNotFound;
