import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Question {
  id: number
  questionText: string
  options: string[]
  answer: string
  timeLimit: number
}

export interface CategoryResponse {
  id: number
  title: string
  totalQuestions: number
  imgSrc: string
  defaultTimeLimit: number
}

interface UpdateCategory {
  id: number
  title: string
  imgSrc: string
  defaultTimeLimit: number
}

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://quizme-backend-612i.onrender.com/api/Quiz',
  }),
  tagTypes: ['Categories', 'Questions'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryResponse[], string>({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),

    getQuestionsByCategory: builder.query<Question[], string>({
      query: (category) => `/${category}`,
      providesTags: (result, error, category) =>
        result ? [{ type: 'Questions', id: category }] : ['Questions'],
    }),

    updateCategory: builder.mutation<void, UpdateCategory>({
      query: ({ id, title, imgSrc, defaultTimeLimit }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: { title, imgSrc, defaultTimeLimit },
      }),
      invalidatesTags: ['Categories'],
    }),

    createCategory: builder.mutation<CategoryResponse, { title: string; imgSrc: string, defaultTimeLimit: number }>({
      query: ({ title, imgSrc , defaultTimeLimit}) => ({
        url: '/categories',
        method: 'POST',
        body: { title, imgSrc, defaultTimeLimit },
      }),
      invalidatesTags: ['Categories'],
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
      invalidatesTags: (result, error, { category }) => [
        { type: 'Questions', id: category },
        'Categories',
      ],
    }),

    deleteCategory: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),

    updateQuestion: builder.mutation<void, { id: number; questionData: Omit<Question, 'id'> }>({
      query: ({ id, questionData }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        body: questionData,
      }),
      invalidatesTags: ['Questions'],
    }),

    deleteQuestion: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Questions'],
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
