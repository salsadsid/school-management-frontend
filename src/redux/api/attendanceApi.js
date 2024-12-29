import { apiSlice } from ".";
import { generateQueryString } from "../../utils/generateQueryString";

const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAttendance: builder.mutation({
      query: (body) => ({
        url: "attendance/new",
        method: "POST",
        body: body,
      }),
    }),
    getAttendances: builder.query({
      query: (args) => {
        const { queryString } = generateQueryString({ queryObject: args });
        return {
          url: `attendance${queryString}`,
        };
      },
    }),
  }),
});

export const { useCreateAttendanceMutation, useGetAttendancesQuery } =
  attendanceApi;
