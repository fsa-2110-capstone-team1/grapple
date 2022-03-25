import React from "react";

// ?client_id=80097&client_secret=1b9da115503d5dc57f97be8b89b6c47058c3a9fb&refresh_token=20fafbc21489c0cf90dfea629e76c2e84b9b6e10&grant_type=refresh_token

const StravaAPI = () => {
  const authLink = "https://www.strava.com/oauth/token";

  const getActivities = (res) => {
    //   console.log('res', res.access_token)
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
    fetch(activities_link).then((res) => console.log(res.json()));
  };

  const reauthActivities = () => {
    fetch(authLink, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: "80097",
        client_secret: "1b9da115503d5dc57f97be8b89b6c47058c3a9fb",
        refresh_token: "20fafbc21489c0cf90dfea629e76c2e84b9b6e10",
        grant_type: "refresh_token",
      }),
    })
      .then((res) => res.json())
      .then((res) => getActivities(res));
  };

//   getActivities();
  reauthActivities();
  return <h4>test</h4>;
};
export default StravaAPI;
