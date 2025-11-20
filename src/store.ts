import { configureStore } from "@reduxjs/toolkit";
import { quizApi } from "./store/GameSlice";


export const store = configureStore({
  reducer: {
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(quizApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

