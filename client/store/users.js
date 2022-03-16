import axios from "axios";

// ACTION TYPES
const GET_PUBLIC_USERS = "GET_PUBLIC_USERS";

// ACTION CREATORS

const _getPublicUsers = (users) => ({
  type: GET_PUBLIC_USERS,
  users,
});

//THUNK CREATORS

export const getPublicUsers = () => {
  return async (dispatch) => {
    const { data: users } = await axios.get(`/api/users/public`);
    dispatch(_getPublicUsers(users));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_PUBLIC_USERS:
      return action.users;
    default:
      return state;
  }
};
