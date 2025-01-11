import { apiSlice } from ".";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => `/teacher`,
    }),
    createUserAndTeacher: builder.mutation({
      query: (body) => ({
        url: "teacher/new",
        method: "POST",
        body: body,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `teacher/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateUserAndTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
