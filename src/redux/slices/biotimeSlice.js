import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const biotimeSlice = createSlice({
  name: "biotime",
  initialState,
  reducers: {
    setBiotimeToken: (state, { payload }) => ({
      ...state,
      token: payload.token,
    }),
  },
});

export const { setBiotimeToken } = biotimeSlice.actions;

export default biotimeSlice.reducer;
