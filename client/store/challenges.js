import axios from "axios";

// ACTION TYPES

const GET_ALL_CHALLENGES = "GET_ALL_CHALLENGES";
const ADD_NEW_CHALLENGE = "ADD_NEW_CHALLENGE";
const UPDATE_CHALLENGE = "UPDATE_CHALLENGE";
const DELETE_CHALLENGE = "DELETE_CHALLENGE";

// ACTION CREATORS

const _getAllChallenges = (challenges) => ({
  type: GET_ALL_CHALLENGES,
  challenges,
});

const _addNewChallenge = (challenge) => ({
  type: ADD_NEW_CHALLENGE,
  challenge,
});

const _updateChallenge = (challenge) => ({ type: UPDATE_CHALLENGE, challenge });

const _deleteChallenge = (id) => ({ type: DELETE_CHALLENGE, id });

//THUNK CREATORS

export const getAllChallenges = () => {
  return async (dispatch) => {
    const { data: challenges } = await axios.get("/api/challenges");
    dispatch(_getAllChallenges(challenges));
  };
};

export const addNewChallenge = (challenge) => {
  return async (dispatch) => {
    const { data: newChallenge } = await axios.post(
      "/api/challenges",
      challenge
    );
    dispatch(_addNewChallenge(newChallenge));
  };
};

export const updateChallenge = (challenge) => {
  return async (dispatch) => {
    const { data: updatedChallenge } = await axios.put(
      `/api/challenges/${challenge.id}`,
      challenge
    );
    dispatch(_updateChallenge(updatedChallenge));
  };
};

export const deleteChallenge = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/challenges/${id}`);
    dispatch(_deleteChallenge(id));
  };
};

export const challenges = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_CHALLENGES:
      return action.challenges;
    case ADD_NEW_CHALLENGE:
      return [...state, action.challenge];
    case UPDATE_CHALLENGE:
      return state.map((challenge) =>
        challenge.id === action.challenge.id ? action.challenge : challenge
      );
    case DELETE_CHALLENGE:
      return state.filter((challenge) => challenge.id !== action.id);
    default:
      return state;
  }
};
