import { apiSlice } from ".";

const admissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdmissionInfo: builder.mutation({
      query: (body) => ({
        url: "admission",
        method: "POST",
        body: body,
      }),
    }),
    getAllAdmissionInfo: builder.query({
      query: () => "admission",
    }),
  }),
});

export const { useAddAdmissionInfoMutation, useGetAllAdmissionInfoQuery } =
  admissionApi;
