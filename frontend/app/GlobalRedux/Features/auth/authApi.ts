import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInCredential, userSignInReturn, signUpCredential } from "@/Types/Auth";
import { PasswordResetParameter, User } from "@/Types/User";

export const authApi = createApi({
  reducerPath: "auth-api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://transfomera.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("tokenT");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
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

    resetUserPassword: build.mutation<
      PasswordResetParameter,
      PasswordResetParameter
    >({
      query: (userPasswordObj) => ({
        url: `api/users/${userPasswordObj.userId}`,
        method: "PUT",
        body: {
          currentPassword: userPasswordObj.oldPassword,
          newPassword: userPasswordObj.newPassword,
        },
      }),
    }),

    registerUser : build.mutation<void, signUpCredential>({
      query:(userDetail)=>({
        url:'api/users/register',
        method:"POST",
        body:userDetail
      })
    }),

    getAllTechnicians: build.query<User[], void>({
      query: () => `api/users`,
    }),

  }),


});

export const { useLoginUserMutation, useResetUserPasswordMutation, useRegisterUserMutation, useGetAllTechniciansQuery } = authApi;
