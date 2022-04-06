import axios from "axios";

const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env;

export const cleanUpAuthToken = (str) => {
  return str.split("&")[1].slice(5);
};

export const testAuthGetter = async (authTok) => {
  try {
    const response = await axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${authTok}&grant_type=authorization_code`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getActivities = async (res) => {
//   try {
//     if (res) {
//       const response = (await axios.get(
//         `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
//       )).data;
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUserData = async (userId, accessToken) => {
//   try {
//     const response = await axios.get(
//       `https://www.strava.com/api/v3/athletes/${userId}/stats`,
//       { headers: { Authorization: `Bearer ${accessToken}` } }
//     );
//     console.log("getUserData response", response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };


