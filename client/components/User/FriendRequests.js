import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { acceptConnection, removeConnection } from "../../store/connections";
import axios from "axios";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const { publicUsers, auth } = useSelector((state) => state);

  const [connections, setConnections] = useState([]);

  useEffect(async () => {
    if (user.id) {
      const { data: connections } = await axios.get(
        `/api/connections/${auth.id}`
      );
      setConnections(connections);
    }
  }, [auth?.id]);

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

  return <Box sx={{ minHeight: "100vh" }}>Friend Requests</Box>;
};
export default FriendRequests;
