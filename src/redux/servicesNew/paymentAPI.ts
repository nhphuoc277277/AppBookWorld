import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';

export const paymentApi = createApi({
    reducerPath: 'paymentAPI',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        createPayment: builder.mutation({
            query: ({ body, token }) => {
                return {
                    url: 'accounts/creatPaymentIntent',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${token}`,
                    },
                };
            },

            invalidatesTags: ['Post'],
        }),

        createPaymentChapter: builder.mutation({
            query: body => {
                return {
                    url: 'accounts/postChapterBought',
                    method: 'POST',
                    body: body.body,
                    headers: { Authorization: `Bearer ${body.token}` },
                    validateStatus: (response, result) =>
                        response.status === 200 && !result.isError,
                };
            },
            invalidatesTags: ['Post'],
        }),
    }),
});

export const { useCreatePaymentMutation, useCreatePaymentChapterMutation } =
    paymentApi;
