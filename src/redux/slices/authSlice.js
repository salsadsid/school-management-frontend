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
    login: (state, { payload }) => {
      state.isSignedIn = true;
      state.token = payload.token;
      state.user_info = payload.user_info;
    },

    logout: (state) => initialState,
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
