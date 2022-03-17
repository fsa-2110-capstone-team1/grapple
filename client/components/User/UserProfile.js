import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  CartText,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

export const UserProfile = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  return (
    <div className="profile">
      <img
        className="profile-header"
        src="/homeImgs/grapple-home-runner.jpeg"
        alt="background-image"
      />

      <i
        className="material-icons"
        id="profile-image"
        style={{ marginTop: "20px", fontSize: "155px", color: "#dfdfdf" }}
      >
        face
      </i>
    </div>
  );
};
export default UserProfile;
