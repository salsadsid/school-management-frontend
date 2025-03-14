import { combineReducers } from "redux";
import { apiSlice } from "./api";
import attendanceReducer from "./slices/attendanceSlice";
import authReducer from "./slices/authSlice";
import biotimeReducer from "./slices/biotimeSlice";
import storage from "./storage";

const PERSIST_CONFIG_KEY = "salman";

export const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  attendance: attendanceReducer,
  biotime: biotimeReducer,
});

export const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  whitelist: ["auth", "attendance"],
  storage,
};
