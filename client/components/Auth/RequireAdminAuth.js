import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { me } from "../../store";

const RequireAdminAuth = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [auth, setAuth] = useState({ auth: "not fetched" });

  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    await dispatch(me());
    setAuth(user);
  }, [JSON.stringify(user)]);

  return auth.auth === "not fetched" ? (
    "Loading access credentials..."
  ) : user.isAdmin ? (
    children
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};

export default RequireAdminAuth;
