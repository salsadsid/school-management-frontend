import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  token: null,
  user_info: null,
  userLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }) => ({
      ...state,
      token: payload.token,
    }),
    setUserLoading: (state, { payload }) => ({
      ...state,
      userLoading: payload.userLoading,
    }),
    login: (state, { payload }) => ({
      ...state,
      isSignedIn: true,
      user_info: payload.user_info,
      userLoading: false,
    }),
    logout: (state) => ({ ...initialState, userLoading: false }),
  },
});

export const { login, setToken, logout, setUserLoading } = authSlice.actions;

export default authSlice.reducer;
