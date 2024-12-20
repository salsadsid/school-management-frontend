import { apiSlice } from ".";
import { setToken } from "../slices/authSlice";

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
    loginStudent: builder.mutation({
      query: (body) => ({
        url: "student/login",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;
          console.log(data, "data");
          dispatch(
            setToken({
              token: data.token,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useLoginStudentMutation,
} = studentApi;
