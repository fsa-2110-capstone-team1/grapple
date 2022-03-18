import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardMedia,
} from "@mui/material";
import { UserProfileForm } from "./UserForm";

export const EditUserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] =useState(null)

  //making fields in the form populated on refreshing the page
  useEffect(() => {
    if(userProfile.id){
      setData(userProfile)
    }
  }, [userProfile]);

  return (
    <div className="profile-container">
      <Card className="profile">
        <CardMedia className="image-stack">
          <img
            id="profile-header"
            src="/homeImgs/grapple-home-runner.jpeg"
            alt="background-image"
          />
          {userProfile.image ? (
            <img id="profile-image" src={userProfile.image} />
          ) : (
            <i
              className="material-icons"
              id="profile-image"
              style={{
                marginTop: "20px",
                fontSize: "155px",
                color: "#dfdfdf",
              }}
            >
              face
            </i>
          )}
        </CardMedia>
        {data ? < UserProfileForm preloadedValues = {data}/> : <div>loading..</div>}
      </Card>
    </div>
  );
};
export default EditUserProfile;
