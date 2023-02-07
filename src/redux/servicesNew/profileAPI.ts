import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { MAIN_API } from './endpoint';

// export type ProfileState = {
//   2022?: {
//     month: string;
//     time: string;
//     _id?: string;
//   }
// };

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getReadTimeBook: builder.query<any, { params: string; token: string }>({
            query: ({ params, token }) => ({
                url: `accounts/${params}/getReadTimeBook`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: any) => response.data,
        }),
    }),
});

export const { useGetReadTimeBookQuery, useLazyGetReadTimeBookQuery } =
    profileAPI;
