import { apiSlice } from ".";
import { authSlice, setToken, setUserLoading } from "../slices/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "/login",
          body: body,
          method: "POST",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;
          console.log(data, "data");
          dispatch(
            setToken({
              token: data.token,
            })
          );
          dispatch(setUserLoading({ userLoading: true }));
          dispatch(authApi.endpoints.verifyUser.initiate(null));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    verifyUser: builder.mutation({
      query: () => {
        return {
          url: "/verify",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: data } = await queryFulfilled;
          dispatch(
            authSlice.actions.login({
              user_info: data.user,
              isSignedIn: true,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    registerUser: builder.mutation({
      query: (body) => {
        return {
          url: "/signup",
          body: body,
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
