import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_NODE_ENV_DEVELOPMENT
      : import.meta.env.VITE_NODE_ENV_PRODUCTION,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    // console.log(token);
    if (token) {
      headers.set("Authorization", `token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (
    result.error?.status === 401 &&
    result.error?.data?.message === "Invalid token"
  ) {
    // Clear local storage
    localStorage.removeItem("authToken");

    // Dispatch logout action if using Redux auth state
    api.dispatch(logout());

    // // Navigate to login page
    // navigate("/login");
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: [
    "getAllAdmissionInfo",
    "getAnAdmissionInfo",
    "updateAnAdmissionInfo",
    "getAllStudents",
    "getStudent",
    "createStudent",
    "updateStudent",
    "deleteStudent",
  ],
  endpoints: () => ({}),
});
