import { apiSlice } from ".";

const serverCheckApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    serverConeectionCheck: builder.query({
      query: () => `/`,
    }),
  }),
});

export const { useServerConeectionCheckQuery } = serverCheckApi;
