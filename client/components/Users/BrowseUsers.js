import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import UserCard from "./UserCard";
import SearchUsers from "./SearchUsers";

export const BrowseUsers = () => {
  const publicUsers = useSelector((state) => state.publicUsers);

  return (
    <Grid container>
             <SearchUsers data={publicUsers} />
      <Grid item xs={0.5} md={1} />
      <Grid item xs={11} md={10} container>
        {publicUsers.map((user) => (
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
