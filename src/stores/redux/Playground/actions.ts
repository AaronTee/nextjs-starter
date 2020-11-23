import { PlaygroundActions } from "./types";

export function setText(text: string): PlaygroundActions {
  return {
    type: "SET_TEXT",
    payload: text,
  };
}
