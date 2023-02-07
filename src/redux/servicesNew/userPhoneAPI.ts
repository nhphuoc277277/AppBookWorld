import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MAIN_API } from './endpoint';

export const userPhoneApi = createApi({
    reducerPath: 'userPhoneApi',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({ baseUrl: MAIN_API }),
    endpoints: builder => ({
        login: builder.mutation({
            query: body => ({
                url: '/accounts/loginNumberPhone',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        getLogin: builder.query({
            query: () => '/accounts/loginNumberPhone',
            providesTags: ['Post'],
        }),
    }),
});

export const { useLoginMutation, useGetLoginQuery } = userPhoneApi;
