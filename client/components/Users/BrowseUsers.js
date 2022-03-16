import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import UserCard from "./UserCard";

export const BrowseUsers = () => {
  const publicUsers = useSelector((state) => state.publicUsers);

  return (
    <Grid container>
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
