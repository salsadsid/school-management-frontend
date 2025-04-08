import { apiSlice } from ".";

const classApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => `/class`,
      providesTags: ["getAllClasses"],
    }),
    getClass: builder.query({
      query: ({ id }) => `/class/${id}`,
      providesTags: ["getClass"],
    }),
    createClass: builder.mutation({
      query: (body) => ({
        url: "class/new",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["getAllClasses", "getClass"],
    }),
    updateClass: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `class/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["getClass", "getAllClasses"],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
} = classApi;
