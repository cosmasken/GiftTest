import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/api/v1'}),
  endpoints: builder => ({
    login: builder.mutation({
      query: userCredential => ({
        url: '/auth/login',
        method: 'POST',
        body: userCredential,
      }),
    }),
  }),
});

export const {useLoginMutation} = apiSlice;
