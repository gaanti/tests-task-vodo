import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApiUrl = process.env.REACT_APP_BASE_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
});

export const api = createApi({
  reducerPath: 'myProjectApi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
