import { saveAuthor } from '@redux/reducerNew';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';

type AuthorState = {
    _id?: string;
    name?: string;
    avatar?: string;
    aboutAuthor?: {};
};
export const authorAPI = createApi({
    reducerPath: 'authorAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getAllAuthor: builder.query<AuthorState[], string>({
            query: token => ({
                url: `accounts/allAuthor`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveAuthor(data.data));
                } catch (err) {
                    console.log('error api getAllAuthor... ', err);
                }
            },
        }),
    }),
});

export const { useGetAllAuthorQuery, useLazyGetAllAuthorQuery } = authorAPI;
