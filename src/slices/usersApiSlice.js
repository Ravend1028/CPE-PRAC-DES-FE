import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data
      })
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: data
      })
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotpass`,
        method: 'PUT',
        body: data
      })
    }),

  })
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation, 
  useUpdateUserMutation,
  useUpdateUserPasswordMutation } = usersApiSlice;