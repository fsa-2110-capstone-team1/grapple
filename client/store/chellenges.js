import axios from "axios";

// INITIAL STATE

const initialState = {
  challenges: [],
  challenge: {},
}

// ACTION TYPES

const GET_ALL_CHALLENGES = "GET_ALL_CHALLENGES"
const GET_SINGLE_CHALLENGE = "GET_SINGLE_CHALLENGE"
const ADD_NEW_CHALLENGE = "ADD_NEW_CHALLENGE"
const UPDATE_CHALLENGE = "UPDATE_CHALLENGE"
const DELETE_CHALLENGE = "DELETE_CHALLENGE"

// ACTION CREATORS

const _getAllChallenges = (challenges) => ({ type: GET_ALL_CHALLENGES, challenges });
const _getSingleChallenge = (challenge) => ({ type: GET_SINGLE_CHALLENGE, challenge });
const _addNewChallenge = (challenge) => ({ type: ADD_NEW_CHALLENGE, challenge });
const _updateChallenge = (challenge) => ({ type: UPDATE_CHALLENGE, challenge})
const _deleteChallenge = (id) => ({ type: DELETE_CHALLENGE, id });

//THUNK CREATORS

export const getAllChallenges = () => {
  return async (dispatch) => {
    const challenges = (await axios.get('/api/challenges')).data
    dispatch(_getAllChallenges(challenges))
  }
}

export const getSingleChallenge = (id) => {
  return async (dispatch) => {
    let challenge = (await axios.get(`/api/challenges/${id}`)).data
    dispatch(_getSingleChallenge(challenge))
  }
}

export const addNewChallenge = (challenge) => {
  return async (dispatch) => {
    const newChallenge = (await axios.post('/api/challenges'), challenge).data
    dispatch(_addNewChallenge(newChallenge))
  }
}

export const updateChallenge = (id, challenge) => {
  return async (dispatch) => {
    challenge = (await axios.put(`/api/challenges/${id}`, challenge)).data
    dispatch(_updateChallenge(challenge))
  }
}

export const deleteChallenge = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/challenges/${id}`).data
    dispatch(_deleteChallenge(id))
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHALLENGES:
      return { ...state, challenges: action.challenges }
    case GET_SINGLE_CHALLENGE:
      return {...state, challenge:action.challenge};
    case ADD_NEW_CHALLENGE:
      return { ...state, challenges: [...state.challenges, action.challenge] }
    case UPDATE_CHALLENGE:
      return { ...state, challenge: action.challenge}
    case DELETE_CHALLENGE:
      return {...state,
        challenges: state.challenges.filter((challenge) => challenge.id !== action.id),
      }
    default:
      return state
  }
}