import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import {
  getConnections,
  acceptConnection,
  createConnection,
} from "../../store/connections";

const PersonProfileDetails = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { connections, publicUsers, userChallenges, challenges, auth } =
    useSelector((state) => state);

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const foundUser = publicUsers.find((u) => u.username === username);
    setUser(foundUser);
  }, [publicUsers]);

  useEffect(() => {
    if (user.id) dispatch(getConnections(user.id));
  }, [user?.id]);

  useEffect(() => {
    if (!!connections && !!user) {
      if (user) {
        const myConns = connections
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
    <div>
      <h4>
        {user?.firstName} {user?.lastName}
      </h4>
      <h5>Member since {dateFormat(user?.createdAt, "mediumDate")}</h5>
      <h4>Friends</h4>
      <ul>
        {friends.map((friend) => (
          <li>
            {publicUsers.find((user) => user.id === friend.friendId)?.username}:{" "}
            {friend.status}
            {friend.status !== "accepted" ? (
              <button onClick={() => dispatch(acceptConnection(friend.id))}>
                Accept
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
      <button onClick={() => dispatch(createConnection(auth.id, user.id))}>
        Add Friend
      </button>
    </div>
  );
};
export default PersonProfileDetails;
