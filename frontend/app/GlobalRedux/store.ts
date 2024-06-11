"use strict";
import { chatApi } from "./Features/chat/chatApi";
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Features/auth/authApi";
import { transformerApi } from "./Features/transormers/transormersAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transformerApi.reducerPath]: transformerApi.reducer,
    [chatApi.reducerPath]:chatApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(transformerApi.middleware)
      .concat(chatApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
