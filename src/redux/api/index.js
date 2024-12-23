import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_NODE_ENV_DEVELOPMENT
      : import.meta.env.VITE_NODE_ENV_PRODUCTION,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    // console.log(token);
    if (token) {
      headers.set("Authorization", `token ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "getAllAdmissionInfo",
    "getAnAdmissionInfo",
    "updateAnAdmissionInfo",
  ],
  endpoints: () => ({}),
});
