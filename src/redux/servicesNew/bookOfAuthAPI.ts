import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';
import { changeLoading, saveFavoriteBookReducer } from '@redux/reducerNew';
export type BookOfAuthState = {
    _id?: string;
    categoryId?: string;
    account?: Array<Object>;
    releasedDate?: string;
    name?: string;
    image: Array<string>;
    introduction: string;
    overview: string;
    numSumRead: number;
    isPrice: number;
    imageAuthor: string;
};

export const bookOfAuthAPI = createApi({
    reducerPath: 'bookOfAuthAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getBookOfAuthor: builder.query<
            BookOfAuthState[],
            { token: string; id: string }
        >({
            query: ({ id, token }) => {
                return {
                    url: `books/${id}/getAllBookAuthor`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            transformResponse: (response: any) => response,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    dispatch(changeLoading('SHOW'));
                    const { data } = await queryFulfilled; // Save data in store, using reducer
                    dispatch(changeLoading('HIDE'));
                } catch (err) {
                    console.log('error api getAllBookAuthor... ', err);
                }
            },
        }),
        getFavoriteBook: builder.query<
            BookOfAuthState[],
            { token: string; id: string }
        >({
            query: ({ token, id }) => ({
                url: `accounts/${id}/getFavoriteBooks`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(saveFavoriteBookReducer({ data: data.data })); // Save data in store, using reducer
                } catch (err) {
                    // console.log('error api getAllBook... ', err);
                }
            },
        }),
        getBookReaded: builder.query<
            BookOfAuthState[],
            { id: string; token: string }
        >({
            query: ({ id, token }) => ({
                url: `accounts/${id}getReadingBooks`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        postSaveFavoriteBooks: builder.mutation({
            query: body => {
                return {
                    url: 'accounts/postFavoriteBooks',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        Authorization: `Bearer ${body.token}`,
                    },
                };
            },
        }),
    }),
});

export const {
    useGetBookOfAuthorQuery,
    useLazyGetBookOfAuthorQuery,
    useGetBookReadedQuery,
    useGetFavoriteBookQuery,
    usePostSaveFavoriteBooksMutation,
} = bookOfAuthAPI;
