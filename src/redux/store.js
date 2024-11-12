import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { apiSlice } from "./api";
import { persistConfig, reducers } from "./storeConfig";

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  // devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export default store;
