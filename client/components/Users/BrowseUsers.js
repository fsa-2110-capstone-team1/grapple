import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import UserCard from "./UserCard";
import SearchUsers from "./SearchUsers";
import PaginationFooter from "./PaginationFooter";

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

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  const indexOfLastChallenge = currentPage * usersPerPage;
  const indexofFirstChallenge = indexOfLastChallenge - usersPerPage;

  const currentUsers = users.slice(indexofFirstChallenge, indexOfLastChallenge);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //scroll to top at page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Grid container>
        <SearchUsers data={publicUsers} />
        <Grid item xs={0.5} sm={0.5} md={1} lg={1.5} />
        <Grid item xs={11} sm={11} md={10} lg={9} container spacing={2}>
          {!currentUsers?.length ? (
            <Grid item>
              {userGroup === "friends" ? (
                <Typography>
                  You don't have any friends yet...
                  {<Link to="/users">Browse users</Link>} to add them as
                  friends!
                </Typography>
              ) : userGroup === "friendRequests" ? (
                <Typography>
                  You don't have any pending friend requests...{" "}
                  {<Link to="/users">Browse users</Link>} to add them as
                  friends!
                </Typography>
              ) : (
                <Typography> "No users found."</Typography>
              )}
            </Grid>
          ) : (
            currentUsers
              ?.filter((user) => user.id !== auth.id)
              .map((user) => (
                <Grid
                  item
                  key={user.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={3}
                  container
                >
                  <UserCard key={user.username} user={user} />
                </Grid>
              ))
          )}
        </Grid>
        <Grid item xs={0.5} sm={0.5} md={1} lg={1.5} />
      </Grid>
      <PaginationFooter
        challengesPerPage={usersPerPage}
        totalPosts={publicUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};
export default BrowseUsers;
