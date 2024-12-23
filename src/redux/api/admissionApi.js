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
      providesTags: ["getAllAdmissionInfo"],
    }),
    getAnAdmissionInfo: builder.query({
      query: ({ id }) => `admission/${id}`,
    }),
    updateAnAdmissionInfo: builder.mutation({
      query: ({ id, application }) => ({
        url: `admission/${id}`,
        method: "PATCH",
        body: application,
      }),
      invalidatesTags: ["getAllAdmissionInfo"],
    }),
  }),
});

export const {
  useAddAdmissionInfoMutation,
  useGetAllAdmissionInfoQuery,
  useGetAnAdmissionInfoQuery,
  useUpdateAnAdmissionInfoMutation,
} = admissionApi;
