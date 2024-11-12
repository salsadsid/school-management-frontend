import { combineReducers } from "redux";
import { apiSlice } from "./api";
import authReducer from "./slices/authSlice";
import storage from "./storage";

const PERSIST_CONFIG_KEY = "salman";

export const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  whitelist: [],
  storage,
};
