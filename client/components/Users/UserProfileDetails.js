import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { acceptConnection, createConnection } from "../../store/connections";

const PersonProfileDetails = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { connections, publicUsers, userChallenges, challenges, auth } =
    useSelector((state) => state);

  const [friendIds, setFriendIds] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!!connections && !!username && !!publicUsers) {
      const foundUser = publicUsers.find((u) => u.username === username);
      setUser(foundUser);
      connections.map((conn) => {
        if (conn.requester_userId === foundUser?.id) {
          setFriendIds([
            ...friendIds,
            {
              friendId: conn.requested_userId,
              status: conn.status,
              connId: conn.id,
            },
          ]);
        } else if (conn.requested_userId === foundUser?.id) {
          setFriendIds([
            ...friendIds,
            {
              friendId: conn.requester_userId,
              status: conn.status,
              connId: conn.id,
            },
          ]);
        }
      });
    }
  }, [publicUsers, connections]);

  return (
    <div>
      <h4>
        {user?.firstName} {user?.lastName}
      </h4>
      <h5>Member since {dateFormat(user?.createdAt, "mediumDate")}</h5>
      <h4>Friends</h4>
      <ul>
        {friendIds.map((friendId) => (
          <li>
            {
              publicUsers.find((user) => user.id === friendId.friendId)
                ?.username
            }
            : {friendId.status}
            {friendId.status !== "accepted" ? (
              <button
                onClick={() => dispatch(acceptConnection(friendId.connId))}
              >
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
