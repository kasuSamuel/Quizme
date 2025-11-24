import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Question {
  id: number
  questionText: string
  options: string[]
  answer: string
}

export interface CategoryResponse {
  id: number
  title: string
  totalQuestions: number
  imgSrc: string
}

interface UpdateCategory {
  id: number
  title: string
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

    // PUT request to update category with id, title, and imgSrc
    updateCategory: builder.mutation<void, UpdateCategory>({
      query: ({ id, title, imgSrc }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: { title, imgSrc },
      }),
    }),

    createCategory: builder.mutation<CategoryResponse, { title: string; imgSrc: string }>({
      query: ({ title, imgSrc }) => ({
        url: '/categories',
        method: 'POST',
        body: { title, imgSrc },
      }),
    }),

    createQuestion: builder.mutation<
      Question,
      { category: string; questionData: Omit<Question, 'id'> }
    >({
      query: ({ category, questionData }) => ({
        url: `/${category}/questions`,
        method: 'POST',
        body: questionData,
      }),
    }),

    deleteCategory: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    }),

    updateQuestion: builder.mutation<void, {  id: number; questionData: Omit<Question, 'id'> }>({
      query: ({ id, questionData }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        body: questionData,
      }),
    }),

    deleteQuestion: builder.mutation<void, {  id: number }>({
      query: ({  id }) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetQuestionsByCategoryQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useCreateQuestionMutation,
  useDeleteCategoryMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,

} = quizApi
