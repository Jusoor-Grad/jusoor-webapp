import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./middleware/logger";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
