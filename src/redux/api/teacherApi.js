import { apiSlice } from ".";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => `/teachers`,
    }),
  }),
});

export const { useGetTeachersQuery } = teacherApi;
