import { combineReducers } from "redux";

/* reducer */
import playground from "./Playground/reducer";

const reducers = () =>
  combineReducers({
    playground,
  });

export default reducers;
