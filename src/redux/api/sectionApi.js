import { apiSlice } from ".";

const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => `/section`,
    }),
    getSection: builder.query({
      query: (id) => `/sections/${id}`,
    }),
    createSection: builder.mutation({
      query: (body) => ({
        url: "section/new",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
} = sectionApi;
