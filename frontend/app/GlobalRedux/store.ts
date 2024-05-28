"use strict";

import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Features/auth/authAPI";
import { transformerApi } from "./Features/transormers/transormersAPI";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transformerApi.reducerPath]: transformerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(transformerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
