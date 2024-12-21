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
    getAnAdmissionInfo: builder.query({
      query: ({ id }) => `admission/${id}`,
    }),
  }),
});

export const {
  useAddAdmissionInfoMutation,
  useGetAllAdmissionInfoQuery,
  useGetAnAdmissionInfoQuery,
} = admissionApi;
