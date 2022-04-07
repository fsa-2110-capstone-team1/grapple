import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dateFormat from "dateformat";

export const UserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(userProfile);

  return (
    <div className="profile-container">
      <Card className="profile">
        <CardMedia className="image-stack">
          <img
            id="profile-header"
            src="/homeImgs/grapple-user-profile.jpeg"
            alt="background-image"
            style={{
              opacity: "0.8",
            }}
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
            
            </i>
          )}
        </CardMedia>
        <CardContent>
          <Typography
            className="profile-title"
            gutterBottom
            variant="h5"
            component="div"
          >
            {userProfile.firstName} {userProfile.lastName}
          </Typography>
          <List className="profile-list">
            <ListItem key={userProfile.email}>
              <ListItemText primary={`Your email: ${userProfile.email}`} />
            </ListItem>
            <ListItem key={userProfile.username}>
              <ListItemText
                primary={`Your username: ${userProfile.username}`}
              />
            </ListItem>
            <ListItem key={userProfile.createdAt}>
              <ListItemText
                primary={`Member since: ${dateFormat(
                  userProfile.createdAt,
                  "mediumDate"
                )}`}
              />
            </ListItem>
          </List>
          <Button
            size="medium"
            fullWidth
            variant="contained"
            onClick={() => navigate(`/user/profile/edit`)}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserProfile;
