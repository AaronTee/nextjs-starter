import { HYDRATE } from "next-redux-wrapper";
import { StoreState } from "..";
import { PayloadedAction } from "../types";

export interface PlaygroundState {
  text: string;
}

export type PlaygroundActions =
  | PayloadedAction<typeof HYDRATE, StoreState>
  | PayloadedAction<"SET_TEXT", string>;
