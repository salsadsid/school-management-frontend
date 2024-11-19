import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: " http://localhost:8080/api/v1",
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
  tagTypes: [],
  endpoints: () => ({}),
});
