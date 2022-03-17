import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import {
  acceptConnection,
  createConnection,
  removeConnection,
} from "../../store/connections";
import axios from "axios";

const PersonProfileDetails = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { publicUsers, userChallenges, challenges, auth } = useSelector(
    (state) => state
  );

  const [connections, setConnections] = useState([]);

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const foundUser = publicUsers.find((u) => u.username === username);
    setUser(foundUser);
  }, [publicUsers]);

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
        const myConns = [...connections]
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

  function handleAddFriend() {
    dispatch(createConnection(auth.id, user.id));
    setConnections([
      ...connections,
      {
        id: -1,
        requester_userId: auth.id,
        requested_userId: user.id,
        status: "pending",
      },
    ]);
  }

  function handleAcceptRequest(connId) {
    dispatch(acceptConnection(connId));
    setConnections(
      connections.map((conn) =>
        conn.id === connId ? { ...conn, status: "accepted" } : conn
      )
    );
  }

  function handleRemoveConnection(connId) {
    dispatch(removeConnection(connId));
    setConnections(connections.filter((conn) => conn.id !== connId));
  }

  return (
    <div>
      <h4>
        {user?.firstName} {user?.lastName}{" "}
        {user?.id === auth?.id ? "(ME!)" : ""}
      </h4>
      <h5>Member since {dateFormat(user?.createdAt, "mediumDate")}</h5>

      {user?.id === auth?.id ? (
        <div>
          <h4>Friend Requests</h4>
          {connections
            .filter(
              (conn) =>
                //pending friend requests
                conn.status === "pending" && auth.id === conn.requested_userId
            )
            .map((conn) => (
              <li>
                {
                  publicUsers.find((user) => user.id === conn.requester_userId)
                    ?.username
                }
                <button onClick={() => handleAcceptRequest(conn.id)}>
                  Accept
                </button>
                <button onClick={() => handleRemoveConnection(conn.id)}>
                  Decline
                </button>
              </li>
            ))}
        </div>
      ) : (
        ""
      )}

      <h4>Friends</h4>
      <ul>
        {friends.map((friend) => (
          <li>
            {publicUsers.find((user) => user.id === friend.friendId)?.username}
            {user?.id === auth?.id ? (
              <button onClick={() => handleRemoveConnection(friend.id)}>
                Remove
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>

      <h4>Challenges</h4>
      <ul>
        {userChallenges
          ?.filter((uc) => uc.userId === user?.id)
          .map((uc) => (
            <li>
              {
                challenges.find((challenge) => challenge.id === uc.challengeId)
                  ?.name
              }
            </li>
          ))}
      </ul>
      {user?.id === auth?.id ? (
        ""
      ) : friends.find((friend) => friend.friendId === auth?.id) ? (
        <button disabled>Already Friends</button>
      ) : connections.find((conn) => conn.requester_userId === auth?.id) ? (
        <button disabled>Request Pending</button>
      ) : connections.find((conn) => conn.requested_userId === auth?.id) ? (
        <button
          onClick={() =>
            handleAcceptRequest(
              connections.find((conn) => conn.requested_userId === auth?.id).id
            )
          }
        >
          Accept Request
        </button>
      ) : (
        <button onClick={() => handleAddFriend()}>Add Friend</button>
      )}
    </div>
  );
};
export default PersonProfileDetails;
