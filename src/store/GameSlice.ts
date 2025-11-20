import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface Question {
  id: number
  questionText: string
  options: string[]
  answer: string
}

interface CategoryResponse {
  id: number
title: string
totalQuestions: number
imgSrc: string
}

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://quizme-backend-612i.onrender.com/api/Quiz',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse[], string>({
      query: () => 'categories',
    }),

    getQuestionsByCategory: builder.query<Question[], string>({
      query: (category) => `/${category}`,
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetQuestionsByCategoryQuery,
} = quizApi;
