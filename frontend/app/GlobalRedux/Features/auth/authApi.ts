import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInCredential, userSignInReturn } from "@/Types/Auth";
import { PasswordResetParameter } from "@/Types/User";

export const authApi = createApi({
  reducerPath: "auth-api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://transfomera.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("tokenT")
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    loginUser: build.mutation<userSignInReturn, SignInCredential>({
      query: (credential) => ({
        url: "api/users/login",
        method: "Post",
        body: credential,
      }),
    }),

    resetUserPassword: build.mutation<PasswordResetParameter, PasswordResetParameter>({
      query: (userPassword) => ({
          url: `User/ResetPassword`,
          method: 'POST',
          body: userPassword,
      }),
  }),
    
  }),
});

export const {useLoginUserMutation, useResetUserPasswordMutation} = authApi;
