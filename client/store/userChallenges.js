import axios from "axios";

// ACTION TYPES

const GET_USERCHALLENGES = "GET_USERCHALLENGES";
const CREATE_USERCHALLENGE = "CREATE_USERCHALLENGE";
const UPDATE_USERCHALLENGE = "UPDATE_USERCHALLENGE";
const REMOVE_USERCHALLENGE = "REMOVE_USERCHALLENGE";

// ACTION CREATORS

const _getUserChallenges = (userChallenges) => ({
  type: GET_USERCHALLENGES,
  userChallenges,
});
const _createUserChallenge = (userChallenge) => ({
  type: CREATE_USERCHALLENGE,
  userChallenge,
});
const _updateUserChallenge = (userChallenge) => ({
  type: UPDATE_USERCHALLENGE,
  userChallenge,
});
const _removeUserChallenge = (userChallengeId) => ({
  type: REMOVE_USERCHALLENGE,
  userChallengeId,
});

//THUNK CREATORS

export const getUserChallenges = (userId) => {
  return async (dispatch) => {
    const { data: userChallenges } = await axios.get(
      `/api/userChallenges/${userId}`
    );
    dispatch(_getUserChallenges(userChallenges));
  };
};

export const createUserChallenge = (userChallenge) => {
  return async (dispatch) => {
    const { data: newUserChallenge } = await axios.post(
      "/api/userChallenges",
      userChallenge
    );
    dispatch(_createUserChallenge(newUserChallenge));
  };
};

export const updateUserChallenge = (userChallenge) => {
  return async (dispatch) => {
    const { data: updatedUserChallenge } = await axios.put(
      `/api/userChallenges/${userChallenge.userId}`,
      userChallenge
    );
    dispatch(_updateUserChallenge(updatedUserChallenge));
  };
};

export const removeUserChallenge = (userChallengeId) => {
  return async (dispatch) => {
    await axios.delete(`/api/userChallenges/${userChallengeId}`);
    dispatch(_removeUserChallenge(userChallengeId));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_USERCHALLENGES:
      return action.userChallenges;
    case CREATE_USERCHALLENGE:
      return [...state.userChallenges, action.userChallenge];
    case UPDATE_USERCHALLENGE:
      return state.map((userChallenge) =>
        userChallenge.id === action.userChallenge.id
          ? action.userChallenge
          : userChallenge
      );
    case REMOVE_USERCHALLENGE:
      return state.filter(
        (userChallenge) => userChallenge.id !== action.userChallengeId
      );
    default:
      return state;
  }
};
