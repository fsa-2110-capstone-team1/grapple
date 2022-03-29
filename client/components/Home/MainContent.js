import React, { useEffect } from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import MainContentLayout from "./MainContentLayout";
import theme from "../../theme";

export const MainContent = () => {
  //   const splash = '/homeImgs/grapple-main-home-bckrnd.jpg';
  const splash = "/homeImgs/grappke-black-line-back.webp";

  const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
  };

  return (
    <MainContentLayout
      sxBackground={{
        backgroundImage: `url(${splash})`,
        backgroundPosition: "center",
        marginTop: 0,
      }}
    >
      <img style={{ display: "none" }} src={splash} alt="increase priority" />
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Container
          sx={{
            mt: 15,
            mb: 0,
            display: "flex",
            position: "relative",
            left: 0,
            top: 0,
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} lg={4}>
              <Box sx={item}>
                <Box
                  sx={{
                    height: 55,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "50%",
                    padding: "7px",
                  }}
                  component="img"
                  // THINKING ICON
                  src="/homeImgs/thinking-white.svg"
                ></Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "25px",
                  }}
                >
                  MENTAL HEALTH
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "30px",
                    borderRadius: "25px",
                    height: { lg: "280px" },
                  }}
                >
                  {"Mental health is key to overall happiness and well being."}

                  {
                    " Reading, Mediation, and Sleep will benefit you in the long run."
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Box sx={item}>
                <Box
                  sx={{
                    height: 55,
                    bgcolor: theme.palette.secondary.main,
                    borderRadius: "50%",
                    padding: "7px",
                  }}
                  component="img"
                  //RUNNING ICON
                  src="/homeImgs/running-white.svg"
                ></Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.primary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "25px",
                  }}
                >
                  PHYSICAL HEALTH
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: "30px",
                    borderRadius: "25px",
                    height: { lg: "280px" },
                  }}
                >
                  {"Physical health is important to keep your body strong."}

                  {
                    " Running, biking, and lifting will keep you in tip top shape."
                  }
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Box sx={item}>
                <Box
                  sx={{
                    height: 55,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: "50%",
                    padding: "7px",
                  }}
                  component="img"
                  //HANDS AND HEART ICON
                  src="/homeImgs/love-white.svg"
                ></Box>
                <Typography
                  variant="h6"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "25px",
                    textAlign: "center",
                  }}
                >
                  ALL AROUND HEALTH
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "30px",
                    borderRadius: "25px",
                    height: { lg: "280px" },
                  }}
                >
                  {"Doing whats best for your well being is important. "}
                  {
                    " Share goals with your friends and family to keep yourself motivated."
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainContentLayout>
  );
};
export default MainContent;
