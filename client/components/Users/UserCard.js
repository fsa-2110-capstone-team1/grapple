import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  getConnections,
  acceptConnection,
  createConnection,
  removeConnection,
} from "../../store/connections";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AlarmIcon from "@mui/icons-material/Alarm";

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);

  const { auth } = useSelector((state) => state);

  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    if (!!user.id) {
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
    <Card
      sx={{
        background: theme.palette.grey.dark,
        maxWidth: 345,
        pl: 4,
        pr: 4,
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/users/profile/${user.username}`)}
      >
        <CardMedia
          component="img"
          height="200"
          image={`${user.image}`}
          alt="user photo"
          sx={{
            borderRadius: 50,
            width: "210px",
            height: "210px",
            marginTop: "20px",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ color: theme.palette.white.main }}
          >
            {user.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            height="auto"
            sx={{ color: theme.palette.white.main }}
          >
            {user.firstName} {user.lastName}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            height="auto"
            sx={{ color: theme.palette.white.main }}
          >
            Member since {dateFormat(user.createdAt, "mediumDate")}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
        {user?.id === auth?.id ? (
          ""
        ) : friends.find((friend) => friend.friendId === auth?.id) ? (
          <Button size="small" variant="contained" disabled>
            <CheckIcon fontSize="small" />
            Friends
          </Button>
        ) : connections.find((conn) => conn.requester_userId === auth?.id) ? (
          <Button size="small" variant="contained" disabled>
            <AlarmIcon fontSize="small" />
            Request Pending
          </Button>
        ) : connections.find((conn) => conn.requested_userId === auth?.id) ? (
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={() =>
                  handleAcceptRequest(
                    connections.find(
                      (conn) => conn.requested_userId === auth?.id
                    ).id
                  )
                }
              >
                <ThumbUpIcon fontSize="small" />
                Accept
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                onClick={() =>
                  handleRemoveConnection(
                    connections.find(
                      (conn) => conn.requested_userId === auth?.id
                    ).id
                  )
                }
              >
                <ThumbDownIcon fontSize="small" />
                Decline
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => handleAddFriend()}
          >
            <PersonAddIcon fontSize="small" />
            <Typography>{"    "}</Typography> Add Friend
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
export default UserCard;
