import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  token: null,
  user_info: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => ({
      ...state,
      token: payload.token,
    }),
    login: (state, { payload }) => ({
      ...state,
      isSignedIn: true,
      user_info: payload.user_info,
    }),
    logout: (state) => initialState,
  },
});

export const { login, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
