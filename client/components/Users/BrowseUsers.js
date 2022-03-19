import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import UserCard from "./UserCard";
import SearchUsers from "./SearchUsers";

export const BrowseUsers = () => {
  const { auth, publicUsers, connections } = useSelector((state) => state);
  const location = useLocation();

  /* users are used for filtered views (friend requests or friend lists), if not available default to all public users */
  const { userGroup } = useParams();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if ((!!connections, !!auth, !!publicUsers?.length)) {
      if (userGroup === "friends") {
        const friends = [...connections]
          .filter((conn) => conn.status === "accepted")
          .map((friend) => {
            const friendId =
              auth.id === friend.requested_userId
                ? friend.requester_userId
                : friend.requested_userId;
            const user = publicUsers?.find((user) => user.id === friendId);
            return user;
          });
        setUsers(friends);
      } else if (userGroup === "friendRequests") {
        const friendRequests = [...connections]
          .filter(
            (conn) =>
              conn.requested_userId === auth?.id && conn.status === "pending"
          )
          .map((friend) =>
            publicUsers?.find((user) => user.id === friend.requester_userId)
          );
        setUsers(friendRequests);
      } else {
        setUsers(publicUsers);
      }
    }
  }, [connections, publicUsers, auth?.id]);

  //scroll to top at page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Grid container>
      {/* <SearchUsers data={publicUsers} /> */}
      <Grid item xs={1} />
      <Grid item xs={10} container>
        {!!users?.length &&
          users
            ?.filter((user) => user.id !== auth.id)
            .map((user) => (
              <Grid item key={user.id} xs={12} sm={6} md={4} lg={3} container>
                <UserCard key={user.username} user={user} />
              </Grid>
            ))}
      </Grid>
      <Grid item xs={1} />
      {/* 
      <Grid item xs={0.5} md={1} />

      <Grid item xs={11} md={10} container>
        {!!users?.length &&
          users
            ?.filter((user) => user.id !== auth.id)
            .map((user) => (
              <Grid item key={user.username} xs={12} container>
                <UserCard key={user.username} user={user} />
              </Grid>
            ))}
      </Grid>
      <Grid item xs={0.5} md={1} /> */}
    </Grid>
  );
};
export default BrowseUsers;
