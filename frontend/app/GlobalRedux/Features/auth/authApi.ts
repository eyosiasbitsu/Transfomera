import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInCredential, userSignInReturn } from "@/Types/Auth";

export const authApi = createApi({
  reducerPath: "auth-api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://transfomera.onrender.com/",
  }),

  endpoints: (build) => ({
    loginUser: build.mutation<userSignInReturn, SignInCredential>({
      query: (credential) => ({
        url: "api/users/login",
        method: "Post",
        body: credential,
      }),
    }),
    
  }),
});

export const {useLoginUserMutation} = authApi;
