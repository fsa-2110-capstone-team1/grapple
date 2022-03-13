import axios from "axios";

// INITIAL STATE

const initialState = {
  userChallenges: [],
  userChallenge: {},
}

// ACTION TYPES

const GET_USERCHALLENGE_FOR_USER = "GET_USERCHALLENGE_FOR_USER"
const CREATE_USERCHALLENGE = "CREATE_USERCHALLENGE"
const UPDATE_USERCHALLENGE = "UPDATE_USERCHALLENGE"
const REMOVE_USERCHALLENGE = "REMOVE_USERCHALLENGE"

// ACTION CREATORS

const _getUserChallengeForUser = (userChallenges) => ({ type: GET_USERCHALLENGE_FOR_USER, userChallenges });
const _createUserChallengeForUser = (userChallenge) => ({ type: CREATE_USERCHALLENGE, userChallenge });
const _updateUserChallengeForUser = (userChallenge) => ({ type: UPDATE_USERCHALLENGE, userChallenge });
const _removeUserChallengeForUser = (userChallenge) => ({ type: REMOVE_USERCHALLENGE, userChallenge})

//THUNK CREATORS

export const getUserChallengeForUser = (userId) => {
  return async (dispatch) => {
    const userChallenges = (await axios.get(`/api/userChallenges/${userId}`)).data
    dispatch(_getUserChallengeForUser(userChallenges))
  }
}

export const createUserChallengeForUser = (userChallenge) => {
  return async (dispatch) => {
    const newUserChallenge = (await axios.post('/api/userChallenges'), userChallenge).data
    dispatch(_createUserChallengeForUser(newUserChallenge))
  }
}

export const updateUserChallengeForUser = (userChallenge) => {
  return async (dispatch) => {
    userChallenge = (await axios.put(`/api/userChallenges/${userChallenge.userId}`, userChallenge)).data
    dispatch(_updateUserChallengeForUser(userChallenge))
  }
}

export const removeUserChallengeForUser = (userChallenge) => {
  return async (dispatch) => {
    await axios.delete(`/api/userChallenges/${userChallenge.userId}`, userChallenge).data
    dispatch(_removeUserChallengeForUser(userChallenge))
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERCHALLENGE_FOR_USER:
      return { ...state, userChallenges: action.userChallenges }
    case CREATE_USERCHALLENGE:
      return { ...state, userChallenges: [...state.userChallenges, action.userChallenge] }
    case UPDATE_USERCHALLENGE:
      return { ...state, userChallenge: action.userChallenge}
    case REMOVE_USERCHALLENGE:
      return {...state,
        userChallenges: state.userChallenges.filter((userChallenge) => userChallenge.id !== action.userChallenge.id),
      }
    default:
      return state
  }
}