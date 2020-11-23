import { CombinedState } from "redux";

export interface PayloadedAction<TType, TPayload> {
  type: TType;
  payload: TPayload;
}

export interface Action<TType> {
  type: TType;
}

export type ExtractRootState<T> = T extends CombinedState<infer T> ? T : never;
