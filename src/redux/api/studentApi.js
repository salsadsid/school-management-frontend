import { apiSlice } from ".";
import { generateQueryString } from "../../utils/generateQueryString";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const { queryString } = generateQueryString({ queryObject: args });
        return {
          url: `student${queryString}`,
        };
      },
      providesTags: ["getAllStudents"],
    }),
    createStudent: builder.mutation({
      query: (body) => ({
        url: "student/new",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["getAllStudents"],
    }),
    getStudent: builder.query({
      query: ({ id }) => `student/${id}`,
      providesTags: ["getStudent"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `student/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getStudent", "getAllStudents"],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getStudent", "getAllStudents"],
    }),
    getStudentsPhoneNumbers: builder.query({
      query: ({ startTime, endTime }) => ({
        url: "student/phones",
        params: { start_time: startTime, end_time: endTime },
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useGetStudentsPhoneNumbersQuery,
} = studentApi;
