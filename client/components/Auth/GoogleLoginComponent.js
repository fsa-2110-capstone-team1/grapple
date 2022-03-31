import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { authenticate } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function GoogleLoginComponent() {
  // const [login, setLogin] = useState(false);
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    if (data.googleId) {
      const authed = await dispatch(authenticate(data, "login/google"));
      if (authed.auth.username) {
        navigate(`/users/profile/${authed.auth.username}`);
      }
    }
  }, [data.googleId]);

  const onSuccess = (res) => {
    console.log("[Login Success currentUser:", res.profileObj);
    const userData = {
      image: res.profileObj.imageUrl,
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,
      firstName: res.profileObj.givenName
        ? res.profileObj.givenName
        : res.profileObj.email,
      lastName: res.profileObj.familyName
        ? res.profileObj.familyName
        : res.profileObj.email,
      username: res.profileObj.name
        ? res.profileObj.name
        : res.profileObj.email,
    };
    setData(userData);
    // setLogin(true);
  };

  const onFailure = (res) => {
    console.log("[Login Failed res:", res);
    // setLogin(false);
  };
  return (
    <div>
      <GoogleLogin
        clientId={process.env.CLIENT_ID_GOOGLE}
        render={(renderProps) => (
          <Button variant="contained" fullWidth onClick={renderProps.onClick}>
            Continue with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleLoginComponent;
