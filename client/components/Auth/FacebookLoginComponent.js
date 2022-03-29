import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { authenticate } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from "axios";

function FacebookLoginComponent() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    async() => {
      if(data.facebookId){
        const authed = await dispatch(authenticate(data, "login/facebook"));
        if (authed.auth.username) {
          navigate(`/users/profile/${authed.auth.username}`);
        }
      }
    },
    [data]
  );
  const responseFacebook = (response) => {
    // console.log("response", response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    const firstName = response.name.split(" ")[0];
    const lastName = response.name.split(" ")[1];
    const newData = {
      image: response.picture.data.url,
      email: response.email,
      facebookId: response.id,
      firstName: firstName,
      lastName: lastName,
      username: response.name,
    };

    setData(newData);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  // console.log("data", data);
  return (
    <div className="container">
      {!login && (
        <FacebookLogin
          appId="654416952305692"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
    </div>
  );
}

export default FacebookLoginComponent;
