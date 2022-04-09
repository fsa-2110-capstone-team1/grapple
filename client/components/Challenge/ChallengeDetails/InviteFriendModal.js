import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Typography, Box, Button, Stack } from "@mui/material";
import theme from "../../../theme";
import UserCard from "../../Users/UserCard";
import { inviteToChallenge } from "../../../store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  height: "60vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InviteFriendModal = ({ userId, challenge }) => {
  const dispatch = useDispatch();

  //Modal Actions
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { publicUsers, connections, userChallenges } = useSelector(
    (state) => state
  );

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!!publicUsers.length && !!connections.length) {
      setFriends(
        [...connections]
          .filter((conn) => {
            const friendId =
              userId === conn.requested_userId
                ? conn.requester_userId
                : conn.requested_userId;
            return (
              (userId === conn.requested_userId ||
                userId === conn.requester_userId) &&
              conn.status === "accepted" &&
              !userChallenges.find(
                (uc) =>
                  uc.userId * 1 === friendId * 1 &&
                  uc.challengeId === challenge.id
              )
            );
          })
          .map((friend) => {
            const friendId =
              userId === friend.requested_userId
                ? friend.requester_userId
                : friend.requested_userId;
            return publicUsers.find((user) => user.id * 1 === friendId * 1);
          })
      );
    }
  }, [publicUsers, userChallenges]);

  const [usersInvited, setUsersInvited] = useState({});
  useEffect(() => {
    setUsersInvited({});
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        sx={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: theme.palette.secondary.main,
          width: "100%",
        }}
        onClick={() => handleOpen()}
      >
        Invite A Friend
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Invite a friend to join this challenge!
            </Typography>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <Box
                  key={friend.id}
                  sx={[
                    {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                      borderRadius: "4px",
                    },
                  ]}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={friend.image}
                      sx={[
                        {
                          borderRadius: "50px",
                          width: "80px",
                          border: "3px solid #c54c7b",
                          padding: "5px",
                          margin: "15px",
                          marginRight: "25px",
                        },
                      ]}
                    />
                    <Typography>{friend.username}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: "30px" }}
                    onClick={() => {
                      dispatch(
                        inviteToChallenge({
                          userId: userId,
                          friendId: friend.id,
                          challengeId: challenge.id,
                        })
                      );
                      setUsersInvited({ ...usersInvited, [friend.id]: true });
                    }}
                    disabled={usersInvited[friend.id]}
                  >
                    Invite
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>
                You don't have any friends left to invite.{" "}
                <Link
                  to="/users"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  Browse users
                </Link>{" "}
                to add more friends!
              </Typography>
            )}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default InviteFriendModal;
