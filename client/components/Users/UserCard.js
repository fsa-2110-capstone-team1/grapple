import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ThemeProvider,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import theme from "../../theme";
import {
  getConnections,
  acceptConnection,
  createConnection,
  removeConnection,
} from "../../store/connections";
import axios from "axios";

export const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const [connections, setConnections] = useState([]);

  const { auth } = useSelector((state) => state);

  const [friends, setFriends] = useState([]);

  useEffect(async () => {
    if (user.id) {
      const { data: connections } = await axios.get(
        `/api/connections/${user.id}`
      );
      setConnections(connections);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!!connections && !!user) {
      if (user) {
        const myConns = connections
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

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          // Provide some spacing between cards
          margin: 1.5,
          width: 1,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3 }}
          columns={{ xs: 10, sm: 12, lg: 12 }}
        >
          <Grid
            item
            xs={4}
            sm={2}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Link to={`/people/${user.username}`}>
              <CardMedia component="img" image={user.image} alt="user photo" />
            </Link>
          </Grid>

          <Grid item xs={6} sm={7} lg={8}>
            <CardContent>
              <Link to={`/people/${user.username}`}>
                <Typography gutterBottom variant="h5" component="div">
                  {user.username}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary" height="auto">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" height="auto">
                Member since {dateFormat(user.createdAt, "mediumDate")}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} sm={3} lg={2} container>
            <CardActions sx={{ width: 1 }}>
              <Button
                size="small"
                sx={{ width: 1 }}
                onClick={() => dispatch(createConnection(auth.id, user.id))}
              >
                <Grid container spacing={0}>
                  <Grid item xs={2} md={4}>
                    <PersonAddIcon />
                  </Grid>
                  <Grid item xs={6} md={8}>
                    <Typography>Add Friend</Typography>
                  </Grid>
                </Grid>
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
};
export default UserCard;
