import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { authenticate } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function FacebookLoginComponent() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    if (data.facebookId) {
      const authed = await dispatch(authenticate(data, "login/facebook"));
      if (authed.auth.username) {
        navigate(`/users/profile/${authed.auth.username}`);
      }
    }
  }, [data.facebookId]);
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
    const userData = {
      image: response.picture.data.url,
      email: response.email,
      facebookId: response.id,
      firstName: firstName,
      lastName: lastName,
      username: response.name,
    };

    setData(userData);
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
          appId={process.env.CLIENT_ID_FB}
          render={(renderProps) => (
            <Button variant="contained" fullWidth onClick={renderProps.onClick}>
              Continue with Facebook
            </Button>
          )}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          
        />
      )}
    </div>
  );
}

export default FacebookLoginComponent;
