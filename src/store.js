import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './constants';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => 'data',
    }),
    getLineData: builder.query({
      query: (line) => `data/${line}`,
    }),
  }),
});

export const { useGetAllDataQuery, useGetLineDataQuery } = api;
export const { reducer: apiReducer } = api;

const store = configureStore({
  reducer: {
    [api.reducerPath]: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
