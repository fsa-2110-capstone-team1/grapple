import React, { useState, useEffect } from "react";

const StravaAPI = () => {
  const authLink = "https://www.strava.com/oauth/token";
  const [data, setData] = useState(null);

  useEffect(() =>{
  const getActivities = (res) => {
    if (res) {
      const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`;
      fetch(activities_link)
      .then((res) => res.json())
      .then(data => setData(data))
      // console.log(data)
    }
  };

  getActivities();

  const reauthActivities = () => {
    fetch(authLink, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: "ce819de32caf4a06ec9dcad5f279424407f93ec7",
        grant_type: "refresh_token",
      }),
    })
      .then((res) => res.json())
      .then((res) => getActivities(res));
  };

  reauthActivities();
}, [])

  return <h4>test</h4>;
};
export default StravaAPI;
