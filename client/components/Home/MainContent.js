import React, { useEffect, useContext } from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import MainContentLayout from "./MainContentLayout";
import theme from "../../theme";
import {LanguageContext} from '../../App';
import { FormattedMessage } from "react-intl";
import { LOCALES, I18nProvider } from "../i18n";

export const MainContent = () => {
  //   const splash = '/homeImgs/grapple-main-home-bckrnd.jpg';
  const splash = "/homeImgs/grapple-bg-home-low.jpg";

  const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
  };
  const language = useContext(LanguageContext)
  return (
    <I18nProvider locale={language.locale}>
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
                  variant="subtitle1"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "10px",
                  }}
                >
                 <FormattedMessage id="mentalhealth" />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "30px",
                    borderRadius: "10px",
                    height: { lg: "280px" },
                  }}
                >
                        <FormattedMessage id="mentalhealthDesc" />
                 
             
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
                  variant="subtitle1"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.primary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "10px",
                  }}
                >
                <FormattedMessage id="physicalHealth" />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    padding: "30px",
                    borderRadius: "10px",
                    height: { lg: "280px" },
                  }}
                >
                     <FormattedMessage id="physicalHealthDesc" />
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
                  variant="subtitle1"
                  sx={{
                    my: 5,
                    backgroundColor: theme.palette.secondary.main,
                    padding: { xs: "15px", md: "25px", lg: "20px" },
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                 <FormattedMessage id="allHealth" />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "30px",
                    borderRadius: "10px",
                    height: { lg: "280px" },
                  }}
                >
                 <FormattedMessage id="allHealthDesc" />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainContentLayout>
    </I18nProvider>
  );
};
export default MainContent;
