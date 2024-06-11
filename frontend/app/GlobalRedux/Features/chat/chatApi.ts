import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chatbot-7jrw.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("tokenT");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (build) => ({
    chat: build.mutation<{ response: string }, string>({
      query: (request) => {
        return {
          url: "message",
          method: "POST",
          body: { message: request },
        };
      },
    }),
  }),
});

export const { useChatMutation } = chatApi;
