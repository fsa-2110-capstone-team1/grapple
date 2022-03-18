import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import UserCard from "./UserCard";
import SearchUsers from "./SearchUsers";

export const BrowseUsers = () => {
  const { auth, publicUsers } = useSelector((state) => state);
  const location = useLocation();

  //scroll to top at page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Grid container>
      {/* <SearchUsers data={publicUsers} /> */}
      <Grid item xs={0.5} md={1} />
      <Grid item xs={11} md={10} container>
        {publicUsers
          .filter((user) => user.id !== auth.id)
          .map((user) => (
            <Grid item key={user.username} xs={12} container>
              <UserCard key={user.username} user={user} />
            </Grid>
          ))}
      </Grid>
      <Grid item xs={0.5} md={1} />
    </Grid>
  );
};
export default BrowseUsers;
