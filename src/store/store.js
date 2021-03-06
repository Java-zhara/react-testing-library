import counterReducer from "./reducers/–°ounterReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};
