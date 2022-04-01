import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Divider,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import theme from "../theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

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

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
];

export const Footer = () => {
  return (
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
                Navigate
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                <Box component="li">
                  <Box component={Link} to="/" color="inherit" sx={{ py: 0.5 }}>
                    Home
                  </Box>
                </Box>
                <Box component="li">
                  <Box
                    component={Link}
                    to="/challenges"
                    color="inherit"
                    sx={{ py: 0.5 }}
                  >
                    Challenges
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" marked="left" gutterBottom>
                Language
              </Typography>
              <TextField
                inputProps={{ style: { color: theme.palette.white.main } }}
                select
                size="medium"
                variant="standard"
                SelectProps={{
                  native: true,
                }}
                sx={{ mt: 1, width: 150 }}
              >
                {LANGUAGES.map((language) => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                Made by Marina Chevis, Ekaterina Svetlakova, Benjamin Greenspan,
                and Louis Rabeno.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </Box>
  );
};
export default Footer;
