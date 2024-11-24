import { apiSlice } from ".";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (body) => ({
        url: "student/new",
        method: "POST",
        body: body,
      }),
    }),
    getAllStudents: builder.query({
      query: () => `/student`,
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } = studentApi;
