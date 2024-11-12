import { apiSlice } from ".";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          body: body,
        };
      },
    }),
  }),
});
