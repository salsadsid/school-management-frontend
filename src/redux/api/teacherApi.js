import { apiSlice } from ".";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => `/teacher`,
    }),
  }),
});

export const { useGetTeachersQuery } = teacherApi;
