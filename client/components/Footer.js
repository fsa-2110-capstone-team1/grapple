import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Divider,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import theme from "../theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import translate from "./i18n/translate";
import {LanguageContext} from '../App';

import { LOCALES, I18nProvider } from "./i18n";
import { FormattedMessage } from "react-intl";


function Copyright() {
  return (
    <>
      {"© "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      Grapple {/* </Link>{' '} */}
      {new Date().getFullYear()}
    </>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  mr: 1,
  "&:hover": {
    bgcolor: "grey",
  },
};


export const Footer = () => {
  const language = useContext(LanguageContext)


  // const [locale, setLocale] = useState(LOCALES.ENGLISH);
  // console.log(locale)
  return (
    <I18nProvider locale={language.locale}>
      <Box>
        <Divider sx={{ m: 0, p: 0 }} />
        <Typography
          component="footer"
          sx={{
            display: "flex",
            color: theme.palette.white.main,
          }}
        >
          <Container sx={{ mt: 4, mb: 4, display: "flex" }}>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={4} md={3}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{ height: 120 }}
                >
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <FacebookIcon fontSize="large" />
                    <InstagramIcon fontSize="large" />
                    <TwitterIcon fontSize="large" />
                  </Grid>
                  <Grid item xs={6}>
                    <Copyright />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="h6" marked="left" gutterBottom>
                  <FormattedMessage id="navigate" />
                </Typography>
                <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                  <Box component="li">
                    <Box
                      component={Link}
                      to="/"
                      color="inherit"
                      sx={{ py: 0.5 }}
                    >

                       <FormattedMessage id="home" />
                    </Box>
                  </Box>
                  <Box component="li">
                    <Box
                      component={Link}
                      to="/challenges"
                      color="inherit"
                      sx={{ py: 0.5 }}
                    >
                    <FormattedMessage id="challenges2" />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={8} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="language">Language</InputLabel>
                  <Select
                    labelId="status"
                    id="status-select"
                    defaultValue={LOCALES.ENGLISH}
                    label="status"
                    onChange={(e) => language.setLocale(e.target.value)}
                  >
                    <MenuItem value={LOCALES.ENGLISH}>English</MenuItem>
                    <MenuItem value={LOCALES.RUSSIAN}>Russian</MenuItem>
                    <MenuItem value={LOCALES.PORTUGUESE}>Portuguese</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <Typography variant="caption">
                {translate("made", {
                    path: (
                      <Typography variant="caption">
                        {" "}
                        Marina Chevis, Ekaterina Svetlakova, Benjamin Greenspan,
                        Louis Rabeno{" "}
                      </Typography>
                    ),
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Typography>
      </Box>
    </I18nProvider>
  );
};
export default Footer;