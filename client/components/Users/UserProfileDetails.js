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
import theme from "../../theme";
import UserBadges from "../User/UserDashboard/Badges";

const UserProfileDetails = () => {
  //scroll to top at page load
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
    if (!!auth?.id && username === auth?.username) setIsSelf(true);
  }, [username, auth]);

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
        };
      });
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
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: theme.palette.braun.main,
        color: theme.palette.white.main,
        pt: "20px",
        pb: "20px",
      }}
    >
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
                sx={{
                  width: "150px",
                  height: "150px",
                  borderRadius: 50,
                  objectFit: "cover",
                  border: "5px solid #4AB5A3"
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7} container direction="column" spacing={1}>
              {/* username, for auth: edit profile and settings, for non auth: add/accept/decline friend */}
              <Grid item container spacing={3}>
                <Grid item>
                  <Typography variant="h5">{user?.username}</Typography>
                </Grid>
                {isSelf ? (
                  <>
                    <Grid item>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate("/user/profile/edit")}
                      >
                        Edit Profile
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        size="small"
                        onClick={() => navigate("/user/settings")}
                      >
                        <SettingsIcon />
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <Grid item>
                    {isSelf ? (
                      ""
                    ) : friends.find(
                        (friend) => friend.friendId === auth?.id
                      ) ? (
                      <Button size="small" variant="outlined" disabled>
                        <CheckIcon fontSize="small" /> Friends
                      </Button>
                    ) : connections.find(
                        (conn) => conn.requester_userId === auth?.id
                      ) ? (
                      <Button size="small" variant="outlined" disabled>
                        Request Pending
                      </Button>
                    ) : connections.find(
                        (conn) => conn.requested_userId === auth?.id
                      ) ? (
                      <Grid container spacing={1}>
                        <Grid item>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleAcceptRequest(
                                connections.find(
                                  (conn) => conn.requested_userId === auth?.id
                                ).id
                              )
                            }
                          >
                            Accept Request
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleRemoveConnection(
                                connections.find(
                                  (conn) => conn.requested_userId === auth?.id
                                ).id
                              )
                            }
                          >
                            Decline Request
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAddFriend()}
                      >
                        Add Friend
                      </Button>
                    )}
                  </Grid>
                )}
              </Grid>

              {/* First and Last names */}
              <Grid item>
                <Typography variant="h6">
                  {user?.firstName} {user?.lastName}
                </Typography>
              </Grid>

              {/* Friends and friend requests */}
              <Grid
                item
                container
                spacing={3}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <Grid item>
                  {isSelf ? (
                    <Link to="/users/friends" style={{ color: "white" }}>
                      <Typography sx={{ color: "white" }}>
                        <b>{friends.length}</b> Friend(s)
                      </Typography>
                    </Link>
                  ) : (
                    <Typography sx={{ color: "white" }}>
                      <b>{friends.length}</b> Friend(s)
                    </Typography>
                  )}
                </Grid>
                {isSelf && !!connections.length && (
                  <Grid item>
                    <Link to="/users/friendRequests" style={{ color: "white" }}>
                      <Typography sx={{ color: "white" }}>
                        <b>
                          {
                            connections.filter(
                              (conn) =>
                                conn.requested_userId === auth?.id &&
                                conn.status === "pending"
                            ).length
                          }
                        </b>{" "}
                        Friend Request(s)
                      </Typography>
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* BADGES */}
          <Divider sx={{ mt: 4 }} />
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">
                Badges (Completed Challenges)
              </Typography>
            </Grid>
            <Grid item>
              <UserBadges challenges={myChallenges} />
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
              <Typography variant="h5">Didn't quite make it...</Typography>
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
export default UserProfileDetails;
