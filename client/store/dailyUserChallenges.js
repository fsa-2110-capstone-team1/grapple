import axios from "axios";

// ACTION TYPES

const GET_DAILYUSERCHALLENGES = "GET_DAILYUSERCHALLENGES";
const CREATE_DAILYUSERCHALLENGE = "CREATE_DAILYUSERCHALLENGE";
const UPDATE_DAILYUSERCHALLENGE_PROGRESS = "UPDATE_DAILYUSERCHALLENGE_PROGRESS";
const GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES =
  "GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES";
const ADD_DAILYUSERCHALLENGE_STRAVA_ACTIVITY =
  "ADD_DAILYUSERCHALLENGE_STRAVA_ACTIVITY";

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

// STRAVA ACTIONS
const _getDailyUserChallengeStravaActivies = (activities) => ({
  type: GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES,
  activities,
});

const _addDailyUserChallengeStravaActivies = (activity) => ({
  type: ADD_DAILYUSERCHALLENGE_STRAVA_ACTIVITY,
  activity,
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

export const createDailyUserChallenge = ({ userChallengeId, date, total }) => {
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
    return newDailyUserChallenge;
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

// STRAVA THUNKS
export const getDailyUserChallengeStravaActivies = (dailyUserChallengeId) => {
  return async (dispatch) => {
    const { data: stravaWorkouts } = await axios.get(
      `/api/stravaWorkouts/dailyUserChallenge/${dailyUserChallengeId}`
    );
    dispatch(_getDailyUserChallengeStravaActivies(stravaWorkouts));
  };
};

export const addDailyUserChallengeStravaActivies = ({
  activity,
  userChallengeId,
}) => {
  return async (dispatch) => {
    const { data: stravaWorkout } = await axios.post(
      `/api/stravaWorkouts`,
      activity
    );
    await dispatch(_addDailyUserChallengeStravaActivies(stravaWorkout));
    dispatch(getDailyUserChallenges(userChallengeId));
  };
};

export default (state = { all: [], strava: [] }, action) => {
  switch (action.type) {
    case GET_DAILYUSERCHALLENGES:
      return { ...state, all: action.dailyUserChallenges };
    case CREATE_DAILYUSERCHALLENGE:
      return { ...state, all: [...state.all, action.dailyUserChallenge] };
    case UPDATE_DAILYUSERCHALLENGE_PROGRESS:
      return {
        ...state,
        all: state.all.map((dailyUserChallenge) =>
          dailyUserChallenge.id === action.dailyUserChallenge.id
            ? {
                ...dailyUserChallenge,
                ...action.dailyUserChallenge,
                error: action.dailyUserChallenge.error,
              }
            : dailyUserChallenge
        ),
      };
    // STRAVA
    case GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES:
      return { ...state, strava: action.activities };
    case ADD_DAILYUSERCHALLENGE_STRAVA_ACTIVITY:
      return {
        ...state,
        strava: [...state.strava, action.activity],
      };
    default:
      return state;
  }
};
