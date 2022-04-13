import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanUpAuthToken, testAuthGetter } from "../Auth/utils/stravaUtils";
import { me, updateUser } from "../../store";
import { getAllStravaActivies } from "../../store/stravaActivities";
import LinearProgress from "@mui/material/LinearProgress";

export const StravaRedirect = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(async () => {
    if (data.stravaId) {
      dispatch(updateUser(data));
      dispatch(getAllStravaActivies(data));
    }
  }, [data?.stravaId, data?.id]);

  useEffect(() => {
    if (user.stravaId) {
      navigate(`/user/settings`);
    }
  }, [user?.stravaId]);

  useEffect(async () => {
    const currUrl = location.search;
    if (currUrl.includes("access_denied")) {
      navigate("/user/settings");
    } else {
      const user = await dispatch(me());
      // Save the Auth Token (it's located under 'search' for some reason)
      const stravaAuthToken = cleanUpAuthToken(location.search);

      // Post Request to Strava (with AuthToken) which returns Refresh Token and and Access Token
      const tokens = await testAuthGetter(stravaAuthToken);
      if (!!tokens && !!user) {
        const userData = {
          stravaId: tokens.athlete.id,
          stravaAccessToken: tokens.access_token,
          stravaRefreshToken: tokens.refresh_token,
          id: user.auth.id,
        };
        await setData(userData);
      }
    }
  }, []);
  return <LinearProgress sx={{ marginTop: "50px" }} />;
};
