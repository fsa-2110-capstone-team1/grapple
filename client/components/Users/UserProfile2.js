import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
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
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const UserProfileDetails = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { publicUsers, userChallenges, challenges, auth } = useSelector(
    (state) => state
  );

  const [connections, setConnections] = useState([]);

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    const foundUser = publicUsers.find((u) => u.username === username);
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

  console.log(user);

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
                sx={{ width: "80%", borderRadius: 50 }}
              />
            </Grid>
            <Grid item xs={7} container direction="column" spacing={1}>
              {/* username, for auth: edit profile and settings, for non auth: add/accept/decline friend */}
              <Grid item container spacing={3}>
                <Grid item>
                  <Typography variant="h5">{user?.username}</Typography>
                </Grid>
                {isSelf ? (
                  <>
                    <Grid item>
                      <Button size="small" variant="outlined">
                        Edit Profile
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button size="small">
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
                  <Typography>
                    <b>{friends.length}</b> Friend(s)
                  </Typography>
                </Grid>
                {isSelf && !!connections.length && (
                  <Grid item>
                    <Link to="/user/friendRequests">
                      <Typography sx={{ color: "black" }}>
                        <b>{connections.length}</b> Friend Request(s)
                      </Typography>
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* BADGES */}
          <Divider sx={{ mt: 4 }} />
          <Grid item>
            {" "}
            <Typography variant="h5">Badges</Typography>
          </Grid>

          {/* CHALLENGES */}
          <Divider sx={{ mt: 4 }} />
          <Grid item>
            <Typography variant="h5">Challenges</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
};
export default UserProfileDetails;
