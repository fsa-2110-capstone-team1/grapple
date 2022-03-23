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
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import ChallengeCard from "../Challenge/ChallengeCard";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow , { tableRowClasses }from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {OngoingChalTable} from "./UserDashboard/OngoingChalTable"



export const UserDashboard = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  

  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const { publicUsers, userChallenges, challenges, auth } = useSelector(
    (state) => state
  );

  const [connections, setConnections] = useState([]);

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});
  const [isSelf, setIsSelf] = useState(false);
  const [myChallenges, setMyChallenges] = useState([]);

  useEffect(() => {
    const foundUser = publicUsers.find(
      (u) => u.username === (username || auth.username)
    );
    setUser(foundUser);
  }, [username, publicUsers]);

  useEffect(async () => {
    if (user.id) {
      const { data: connections } = await axios.get(
        `/api/connections/${user.id}`
      );
      setConnections(connections);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!!connections && !!user) {
      if (user) {
        const myConns = [...connections]
          .filter((conn) => conn.status === "accepted")
          .map((conn) => {
            if (conn.requester_userId === user.id) {
              return {
                friendId: conn.requested_userId,
                status: conn.status,
                id: conn.id,
              };
            } else if (conn.requested_userId === user.id) {
              return {
                friendId: conn.requester_userId,
                status: conn.status,
                id: conn.id,
              };
            }
          })
          .filter((friend) => friend);
        setFriends(myConns);
      }
    }
  }, [connections]);

  useEffect(() => {
    if (!!user?.id && !!auth?.id && user?.id === auth?.id) setIsSelf(true);
  }, [user, auth]);

  useEffect(() => {
    const myChal = userChallenges
      ?.filter((uc) => uc.userId === user?.id)
      .map((uc) => ({
        ...challenges.find((challenge) => challenge.id === uc.challengeId),
        status: uc.status,
      }));
    setMyChallenges(myChal);
  }, [userChallenges, challenges, user?.id]);

  function handleAddFriend() {
    dispatch(createConnection(auth.id, user.id));
    setConnections([
      ...connections,
      {
        id: -1,
        requester_userId: auth.id,
        requested_userId: user.id,
        status: "pending",
      },
    ]);
  }

  function handleAcceptRequest(connId) {
    dispatch(acceptConnection(connId));
    setConnections(
      connections.map((conn) =>
        conn.id === connId ? { ...conn, status: "accepted" } : conn
      )
    );
  }

  function handleRemoveConnection(connId) {
    dispatch(removeConnection(connId));
    setConnections(connections.filter((conn) => conn.id !== connId));
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container spacing={1}>
        <Grid item xs={1} />
        {/* MAIN MIDDLE SECTION */}
        <Grid item xs={10} container direction="column" spacing={4}>
          {/* TOP SECTION */}

          <Grid
            item
            container
            spacing={3}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={3}>
              <Box
                component="img"
                src={user?.image}
                sx={{ width: "150px", height: "150px", borderRadius: 50, objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={7} container direction="column" spacing={1}>
              {/* username, for auth: edit profile and settings, for non auth: add/accept/decline friend */}
              <Grid item container spacing={3}>
                <Grid item>
                  <Typography variant="h5">Welcome {user?.username}!</Typography>
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
          <OngoingChalTable myChallenges={myChallenges}/>
          
          {/* BADGES */}
          <Divider sx={{ mt: 4 }} />
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">
                Badges (Completed Challenges)
              </Typography>
            </Grid>
            <Grid item container>
              {myChallenges
                .filter((ch) => ch.status === "Completed")
                .map((challenge) => (
                  <Grid
                    item
                    key={challenge.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    container
                  >
                    {/* <Link to={`/challenges/${challenge.id}`}> */}
                    <Box
                      key={challenge.id}
                      component="img"
                      src={`/${challenge.image}`}
                      sx={[
                        {
                          borderRadius: "50px",
                          width: "80px",
                          border: "3px solid #c54c7b",
                          padding: "5px",
                        },
                        {
                          "&:hover": {
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          },
                        },
                      ]}
                      onClick={() => navigate(`/challenges/${challenge.id}`)}
                    />
                    {/* </Link> */}
                  </Grid>
                ))}
            </Grid>
          </Grid>

          {/* CHALLENGES */}
          <Divider sx={{ mt: 4 }} />
          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5">Ongoing Challenges</Typography>
            </Grid>
            <Grid item container>
              {myChallenges
                .filter(
                  (ch) =>
                    (ch.status === "In Progress" ||
                      ch.status === "Not Started") &&
                    new Date() <= new Date(ch.endDateTime)
                )
                .map((challenge) => (
                  <Grid
                    item
                    key={challenge.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    container
                  >
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Divider sx={{ mt: 1 }} />

          <Grid item container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="h5">
                "I'll Do Better Next Time" Challenges
              </Typography>
            </Grid>
            <Grid container>
              {myChallenges
                .filter(
                  (ch) =>
                    ch.status !== "Completed" &&
                    new Date() > new Date(ch.endDateTime)
                )
                .map((challenge) => (
                  <Grid
                    item
                    key={challenge.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    container
                  >
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
};
export default UserDashboard;
