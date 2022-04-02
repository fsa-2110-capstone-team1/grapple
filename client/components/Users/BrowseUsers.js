import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import UserCard from "./UserCard";
import SearchUsers from "./SearchUsers";
import PaginationFooter from "../Challenge/BrowseChallenges/PaginationFooter";
import theme from "../../theme";

export const BrowseUsers = () => {
  const location = useLocation();

  const { auth, publicUsers, connections } = useSelector((state) => state);

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
  }, [connections, publicUsers, auth?.id, userGroup]);

  //pagination calculations
  const [activePage, setActivePage] = useState(1);
  const usersPerPage = 12;
  const count = users.length;
  const totalPages = Math.ceil(count / usersPerPage);


  const [calculatedUsers, setCalculatedUsers] = useState([]);
  useEffect(() => {
    setCalculatedUsers(
      users.slice((activePage - 1) * usersPerPage, activePage * usersPerPage)
    );
  }, [users, activePage]);

  //scroll to top at page load or paginate
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, activePage]);

  return (

    <Box sx={{ minHeight: "100vh", p: 4 }}>
      {/* Main page, vertical split for search and browse grid */}
      <Grid container direction="column">
        {/* Search */}
        <Grid item>
          <SearchUsers data={publicUsers} />
        </Grid>

        {/* Bottom  */}
        <Grid item container>
          {/* Left Railing */}
          <Grid item xs={1} />

          {/* Browse Grid, vertical split between grid and pagination footer */}
          <Grid item xs={10} container direction="column" spacing={1}>
            {/* Cards or message about nothing found */}
            <Grid item container spacing={2} sx={{ minHeight: "60vh" }}>
              {!calculatedUsers?.length ? (
                <Grid item>
                  {userGroup === "friends" ? (
                    <Typography sx={{ color: theme.palette.white.main }}>
                      You don't have any friends yet...
                      {
                        <Link
                          to="/users"
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          Browse users
                        </Link>
                      }{" "}
                      to add them as friends!
                    </Typography>
                  ) : userGroup === "friendRequests" ? (
                    <Typography sx={{ color: theme.palette.white.main }}>
                      You don't have any pending friend requests...{" "}
                      {
                        <Link
                          to="/users"
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          Browse users
                        </Link>
                      }{" "}
                      to add them as friends!
                    </Typography>
                  ) : (
                    <Typography>
                      {" "}
                      No users found.{" "}
                      {
                        <Link
                          to="/users"
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          Browse all users
                        </Link>
                      }
                      .
                    </Typography>
                  )}
                </Grid>
              ) : (
                calculatedUsers
                  ?.filter((user) => user.id !== auth.id)
                  .map((user) => (
                    <Grid
                      item
                      key={user.id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      container
                    >
                      <UserCard key={user.username} user={user} />
                    </Grid>
                  ))
              )}
            </Grid>

            {/* Pagination */}
            <Grid item>
              <PaginationFooter
                activePage={activePage}
                totalPages={totalPages}
                setActivePage={setActivePage}
              />
            </Grid>
          </Grid>

          {/* Right Railing */}
          <Grid item xs={1} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default BrowseUsers;
