import axios from "axios";

// ACTION TYPES

const GET_DAILYUSERCHALLENGES = "GET_DAILYUSERCHALLENGES";
const CREATE_DAILYUSERCHALLENGE = "CREATE_DAILYUSERCHALLENGE";
const UPDATE_DAILYUSERCHALLENGE_PROGRESS = "UPDATE_DAILYUSERCHALLENGE_PROGRESS";

// ACTION CREATORS

const _getDailyUserChallengesForUserChallenge = (dailyUserChallenges) => ({
  type: GET_DAILYUSERCHALLENGES,
  dailyUserChallenges,
});
const _createDailyUserChallenge = (dailyUserChallenge) => ({
  type: CREATE_DAILYUSERCHALLENGE,
  dailyUserChallenge,
});
const _updateDailyUserChallengeProgress = (dailyUserChallenge) => ({
  type: UPDATE_DAILYUSERCHALLENGE_PROGRESS,
  dailyUserChallenge,
});

//THUNK CREATORS

export const getDailyUserChallenges = (userChallengeId) => {
  return async (dispatch) => {
    const { data: dailyUserChallenges } = await axios.get(
      `/api/dailyUserChallenges/userChallenge/${userChallengeId}`
    );
    dispatch(_getDailyUserChallengesForUserChallenge(dailyUserChallenges));
  };
};

export const createDailyUserChallenge = (userChallengeId, date, total) => {
  return async (dispatch) => {
    const { data: newDailyUserChallenge } = await axios.post(
      "/api/dailyUserChallenges",
      {
        userChallengeId,
        date,
        total,
      }
    );
    dispatch(_createDailyUserChallenge(newDailyUserChallenge));
  };
};

export const updateChallengeProgress =
  ({ dailyUserChallengeId, value }) =>
  async (dispatch) => {
    try {
      const { data: updatedDailyUserChallenge } = await axios.put(
        `/api/dailyUserChallenges/${dailyUserChallengeId}/updateProgress`,
        { value }
      );
      return dispatch(
        _updateDailyUserChallengeProgress(updatedDailyUserChallenge)
      );
    } catch (error) {
      return dispatch(
        _updateDailyUserChallengeProgress({ id: dailyUserChallengeId, error })
      );
    }
  };

export default (state = [], action) => {
  switch (action.type) {
    case GET_DAILYUSERCHALLENGES:
      return action.dailyUserChallenges;
    case CREATE_DAILYUSERCHALLENGE:
      return [...state, action.dailyUserChallenge];
    case UPDATE_DAILYUSERCHALLENGE_PROGRESS:
      return state.map((dailyUserChallenge) =>
        dailyUserChallenge.id === action.dailyUserChallenge.id
          ? {
              ...dailyUserChallenge,
              ...action.dailyUserChallenge,
              error: action.dailyUserChallenge.error,
            }
          : dailyUserChallenge
      );
    default:
      return state;
  }
};
