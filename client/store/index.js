import { createStore, combineReducers, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import challenges from "./chellenges";

const reducer = combineReducers({
  auth,
  challenges,
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
export * from "./chellenges";
