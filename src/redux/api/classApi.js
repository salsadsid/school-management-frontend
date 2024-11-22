import { apiSlice } from ".";

const classApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => `/class`,
    }),
    getClass: builder.query({
      query: (id) => `/classes/${id}`,
    }),
    createClass: builder.mutation({
      query: (body) => ({
        url: "class/new",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetClassesQuery, useGetClassQuery, useCreateClassMutation } =
  classApi;
