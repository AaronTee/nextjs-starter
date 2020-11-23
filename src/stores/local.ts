import { StoreState } from "@stores/redux/index";
import { ExtractRootState } from "./redux/types";

const storeKeys = {
  reduxState: "state",
  token: "token",
};

export const getLocalStoreItem = (
  key: keyof typeof storeKeys,
  defaultValue: string = undefined
) => {
  return localStorage.getItem(storeKeys[key]) || defaultValue;
};

export const setLocalStoreItem = (
  key: keyof typeof storeKeys,
  value: string
) => {
  localStorage.setItem(storeKeys[key], value);
};

export const removeLocalStoreItem = (key: keyof typeof storeKeys) => {
  localStorage.removeItem(storeKeys[key]);
};

export const clearLocalStore = () => {
  localStorage.clear();
};

export const loadReduxState = (excludes: string[]): StoreState => {
  try {
    const serializedState = getLocalStoreItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);
    return Object.keys(parsedState)
      .filter((s) => !excludes.includes(s))
      .reduce((acc, cur) => {
        acc[cur] = parsedState[cur];
        return acc;
      }, {}) as ExtractRootState<StoreState>;
  } catch (err) {
    return undefined;
  }
};

export const saveReduxState = (state: Partial<StoreState>) => {
  try {
    const serializedState = JSON.stringify(state);
    setLocalStoreItem("reduxState", serializedState);
  } catch (err) {
    // Ignore write errors for now
  }
};

export const removeReduxLocalState = (
  keys: (keyof ExtractRootState<StoreState>)[]
) => {
  try {
    const serializedState = getLocalStoreItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }

    const parsedState = (JSON.parse(
      serializedState
    ) as any) as ExtractRootState<StoreState>;
    const newReduxState = ((Object.keys(
      parsedState
    ) as any) as (keyof ExtractRootState<StoreState>)[])
      .filter((s) => !keys.includes(s))
      .reduce((acc, cur) => {
        acc[cur] = parsedState[cur];
        return acc;
      }, {});
    setLocalStoreItem("reduxState", JSON.stringify(newReduxState));
  } catch (err) {
    return undefined;
  }
};
