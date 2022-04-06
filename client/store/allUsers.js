import axios from "axios";
import { me } from '../store';

// ACTION TYPES
const GET_ALL_USERS = "GET_ALL_USERS"

// ACTION CREATORS

const _getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users,
});

//THUNK CREATORS

export const getAllUsers = () => {
    return async (dispatch) => {
      const user = await dispatch(me())
      if(user.auth.isAdmin === true){
      const { data: users } = await axios.get(`/api/users`);
      dispatch(_getAllUsers(users));
    } else {
      console.log("You are not an Admin")
    }
  }
  
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};
