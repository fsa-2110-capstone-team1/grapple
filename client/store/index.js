import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import challenges from "./challenges";
import connections from "./connections";
import userChallenges from "./userChallenges";
import publicUsers from "./users";
import allUsers from "./allUsers";
import dailyUserChallenges from "./dailyUserChallenges";

const reducer = combineReducers({
  auth,
  challenges,
  connections,
  userChallenges,
  publicUsers,
  dailyUserChallenges,
  allUsers
});

let middleware;
if (process.env.NODE_ENV === "development") {
  middleware = applyMiddleware(thunkMiddleware, 
    // loggerMiddleware
    );
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(reducer, middleware);

export default store;

export * from "./auth";
export * from "./challenges";
export * from "./userChallenges";
export * from "./connections";
export * from "./users";
export * from "./dailyUserChallenges";
