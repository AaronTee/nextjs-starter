import { loadReduxState, saveReduxState } from "@stores/local";
import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import reducers from "./combinedReducers";
import { ExtractRootState } from "./types";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";

let store: ReturnType<typeof initStore>;
export type StoreState = ExtractRootState<ReturnType<typeof store.getState>>;

function initStore(preloadedState) {
  return createStore(
    reducers(),
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState = undefined) => {
  // if (preloadedState !== null) {
  //   preloadedState = loadReduxState([]);
  // }

  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // _store.subscribe(() => {
  //   saveReduxState({
  //     playground: _store.getState().playground,
  //   });
  // });

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

// create a makeStore function
const makeStore: MakeStore<StoreState> = (context: Context) =>
  initializeStore();

// export an assembled wrapper
export const wrapper = createWrapper<StoreState>(makeStore, { debug: true });
