import { merge } from "lodash";
import { HYDRATE } from "next-redux-wrapper";
import { PlaygroundState, PlaygroundActions } from "./types";

const initialState: PlaygroundState = {
  text: "Hello World",
};

const PlaygroundReducer = (
  state: PlaygroundState = initialState,
  action: PlaygroundActions
) => {
  switch (action.type) {
    // case HYDRATE:
    //   state = merge({}, state, action.payload.playground);
    //   break;

    case "SET_TEXT":
      state = {
        ...state,
        text: action.payload,
      };
      break;
  }

  return state;
};

export default PlaygroundReducer;
