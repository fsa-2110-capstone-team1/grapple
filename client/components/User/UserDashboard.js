import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import dateFormat from "dateformat";
import {
  acceptConnection,
  createConnection,
  removeConnection,
} from "../../store/connections";
import axios from "axios";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ChallengeCard from "../Challenge/ChallengeCard";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OngoingChalTable } from "./UserDashboard/OngoingChalTable";
import { Diagram } from "./UserDashboard/Diagram";
import { Badges } from "./UserDashboard/Badges";
import { Leaderboard } from "./UserDashboard/Leaderboard";
import theme from "../../theme";

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { publicUsers, userChallenges, challenges, auth } = useSelector(
    (state) => state
  );

  const [user, setUser] = useState({});
  const [isSelf, setIsSelf] = useState(false);
  const [myChallenges, setMyChallenges] = useState([]);

  useEffect(() => {
    if (isSelf) {
      setUser(auth);
    } else {
      const foundUser = publicUsers.find(
        (u) => u.username === (username || auth.username)
      );
      setUser(foundUser);
    }
  }, [JSON.stringify(auth), publicUsers, isSelf]);

  useEffect(() => {
    if (!!user?.id && !!auth?.id && user?.id === auth?.id) setIsSelf(true);
  }, [user, auth]);

  useEffect(() => {
    const myChal = userChallenges
      ?.filter((uc) => uc.userId === user?.id)
      .map((uc) => {
        const chal = challenges.find(
          (challenge) => challenge.id === uc.challengeId
        );
        return {
          ...chal,
          status:
            new Date() < new Date(chal.startDateTime)
              ? "Not Started"
              : new Date() >= new Date(chal.startDateTime) &&
                new Date() < new Date(chal.endDateTime)
              ? "In Progress"
              : "Ended",
          userChallengeStatus: uc.status,
        };
      });
    setMyChallenges(myChal);
  }, [userChallenges, challenges, user?.id]);

  return (
    <Box sx={{ minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        {/* MAIN MIDDLE SECTION */}
        <Grid item xs={10} container direction="column" spacing={3}>
          {/* TOP SECTION */}
          <Grid
            item
            container
            spacing={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={2}>
              <Box
                component="img"
                src={user?.image}
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: 50,
                  objectFit: "cover",
                  border: "5px solid #4AB5A3",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7} container direction="column" spacing={1}>
              {/* username, for auth: edit profile and settings, for non auth: add/accept/decline friend */}
              <Grid item container spacing={3}>
                <Grid item>
                  <Typography variant="h5">
                    Welcome {user?.username}!
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    size="medium"
                    fullWidth
                    variant="contained"
                    onClick={() => navigate("/challenges/create")}
                  >
                    + Start new challenge
                  </Button>
                </Grid>
              </Grid>

              {/* First and Last names */}
              <Grid item>
                <Typography variant="h6">
                  {user?.firstName} {user?.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Divider sx={{ marginBottom: 2 }} />
          </Grid>

          {/* CHARTS MAIN CONTAINER */}
          <Grid item container spacing={3}>
            {/* LEFT COLUMN */}
            <Grid item xs={8} lg={8} container direction="column" spacing={3}>
              <Grid item>
                <OngoingChalTable myChallenges={myChallenges} />
              </Grid>
              <Grid item>
                <Leaderboard />
              </Grid>
            </Grid>

            {/* RIGHT COLUMN */}
            <Grid item xs={12} lg={4} container direction="column" spacing={3}>
              <Grid item>
                <Diagram myChallenges={myChallenges} />
              </Grid>
              <Grid item>
                <Card>
                  <CardHeader
                    title="Badges"
                    sx={{
                      color: "white",
                      backgroundColor: "#4AB5A3",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    }}
                    titleTypographyProps={{
                      fontSize: "0.875rem",

                      fontWeight: "500",
                    }}
                  />
                  <CardContent>
                    <Badges challenges={myChallenges} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
};
export default UserDashboard;
