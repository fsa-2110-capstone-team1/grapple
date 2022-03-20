import axios from "axios";

// ACTION TYPES

const GET_USERCHALLENGES = "GET_USERCHALLENGES";
const JOIN_CHALLENGE = "JOIN_CHALLENGE";
const UPDATE_CHALLENGE_PROGRESS = "UPDATE_CHALLENGE_PROGRESS";
const LEAVE_CHALLENGE = "LEAVE_CHALLENGE";

// ACTION CREATORS

const _getUserChallenges = (userChallenges) => ({
  type: GET_USERCHALLENGES,
  userChallenges,
});
const _joinChallenge = (userChallenge) => ({
  type: JOIN_CHALLENGE,
  userChallenge,
});
const _updateChallengeProgress = (userChallenge) => ({
  type: UPDATE_CHALLENGE_PROGRESS,
  userChallenge,
});
const _leaveChallenge = (userChallengeId) => ({
  type: LEAVE_CHALLENGE,
  userChallengeId,
});

//THUNK CREATORS

export const getUserChallenges = () => {
  return async (dispatch) => {
    const { data: userChallenges } = await axios.get(`/api/userChallenges`);
    dispatch(_getUserChallenges(userChallenges));
  };
};

export const joinChallenge = (userId, challengeId) => {
  return async (dispatch) => {
    const { data: newUserChallenge } = await axios.post("/api/userChallenges", {
      userId,
      challengeId,
    });
    dispatch(_joinChallenge(newUserChallenge));
  };
};

export const updateChallengeProgress = (userChallenge) => {
  return async (dispatch) => {
    const { data: updatedUserChallenge } = await axios.put(
      `/api/userChallenges/${userChallenge.userId}`,
      userChallenge
    );
    dispatch(_updateChallengeProgress(updatedUserChallenge));
  };
};

export const leaveChallenge = (userChallengeId) => {
  return async (dispatch) => {
    await axios.delete(`/api/userChallenges/${userChallengeId}`);
    dispatch(_leaveChallenge(userChallengeId));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_USERCHALLENGES:
      return action.userChallenges;
    case JOIN_CHALLENGE:
      return [...state, action.userChallenge];
    case UPDATE_CHALLENGE_PROGRESS:
      return state.map((userChallenge) =>
        userChallenge.id === action.userChallenge.id
          ? action.userChallenge
          : userChallenge
      );
    case LEAVE_CHALLENGE:
      return state.filter(
        (userChallenge) => userChallenge.id !== action.userChallengeId
      );
    default:
      return state;
  }
};
