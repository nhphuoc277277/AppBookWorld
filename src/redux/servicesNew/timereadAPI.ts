import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';

export const timereadAPI = createApi({
    reducerPath: 'timereadAPI',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        createTimeRead: builder.mutation<any, { time: number; token: string }>({
            query: body => {
                return {
                    url: 'accounts/changeReadTimeBook',
                    method: 'POST',
                    body: { time: body.time },
                    headers: { Authorization: `Bearer ${body.token}` },
                };
            },
        }),
    }),
});

export const { useCreateTimeReadMutation } = timereadAPI;
