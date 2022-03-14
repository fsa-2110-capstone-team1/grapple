import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import challenges from "./challenges";
import connections from "./connections";
import userChallenges from "./userChallenges";

const reducer = combineReducers({
  auth,
  challenges,
  connections,
  userChallenges,
});

let middleware;
if (process.env.NODE_ENV === "development") {
  middleware = applyMiddleware(thunkMiddleware, loggerMiddleware);
} else {
  middleware = applyMiddleware(thunkMiddleware);
}

const store = createStore(reducer, middleware);

export default store;

export * from "./auth";
export * from "./challenges";
export * from "./userChallenges";
export * from "./connections";
