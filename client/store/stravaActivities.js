import axios from "axios";
import { updateUser } from "../store";

// ACTION TYPES
const GET_ALL_STRAVA_ACTIVITIES = "GET_ALL_STRAVA_ACTIVITIES";
const GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES =
  "GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES";

// ACTION CREATORS

const _getAllStravaActivies = (activities) => ({
  type: GET_ALL_STRAVA_ACTIVITIES,
  activities,
});

const _getDailyUserChallengeStravaActivies = (activities) => ({
  type: GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES,
  activities,
});

//THUNK CREATORS

export const getAllStravaActivies = (data) => {
  return async (dispatch) => {
    // data should include user ID and stravaRefreshToken!!!
    try {
      //getting refreshed access_token and refresh_token
      const res = await axios.post(
        `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${data.stravaRefreshToken}&grant_type=refresh_token`
      );
      //update access_token and refresh_token for loged in user
      await dispatch(
        updateUser({
          stravaAccessToken: res.data.access_token,
          stravaRefreshToken: res.data.refresh_token,
          id: data.id,
        })
      );
      const userActivities = (
        await axios.get(
          `https://www.strava.com/api/v3/athlete/activities?access_token=${res.data.access_token}`
        )
      ).data;
      dispatch(_getAllStravaActivies(userActivities));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDailyUserChallengeStravaActivies = (dailyUserChallengeId) => {
  return async (dispatch) => {
    const { data: stravaWorkouts } = await axios.get(
      `/api/stravaWorkouts/dailyUserChallenge/${dailyUserChallengeId}`
    );
    dispatch(_getDailyUserChallengeStravaActivies(stravaWorkouts));
  };
};

export default (state = { all: [], dailyUserChallenge: [] }, action) => {
  switch (action.type) {
    case GET_ALL_STRAVA_ACTIVITIES:
      return { ...state, all: action.activities };
    case GET_DAILYUSERCHALLENGE_STRAVA_ACTIVITIES:
      return { ...state, dailyUserChallenge: action.activities };
    default:
      return state;
  }
};
