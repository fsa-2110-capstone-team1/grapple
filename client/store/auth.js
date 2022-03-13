import axios from "axios";

const TOKEN = "token";

// ACTION TYPES

const SET_AUTH = "SET_AUTH";
const UPDATE_USER = "UPDATE_USER";

//ACTION CREATORS

const setAuth = (auth) => ({ type: SET_AUTH, auth });
const upUser = (user) => ({ type: UPDATE_USER, user });

//THUNK CREATORS

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (data, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { data });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => (dispatch) => {
  dispatch(setAuth({}));
  window.localStorage.removeItem(TOKEN);
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const newUser = (await axios.put(`/api/users/${user.id}`, user)).data;
      dispatch(upUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

//REDUCER

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
