import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    saveBookReducer,
    changeLoading,
    saveTabCategoryReducer,
    saveCategoryReducer,
    saveFavoriteBookReducer,
    AuthState,
} from '@redux/reducerNew';

import { chapterType } from '@redux/types/chapterType';

import { MAIN_API } from './endpoint';
import { RootState } from '@redux/storeNew';

export type BookState = {
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

type AllChapterType = {
    isPay: boolean;
    idChapter: string;
    chapterNumber: number;
};

export const bookAPI = createApi({
    reducerPath: 'bookAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
        // prepareHeaders: (headers, { getState }) => {
        //     const token = (getState() as RootState).auth.token;
        //     console.log('===> TOKEN ', token);

        //     // If we have a token set in state, let's assume that we should be passing it.
        //     if (token) {
        //         headers.set('authorization', `Bearer ${token}`);
        //     }

        //     return headers;
        // },
    }),
    endpoints: builder => ({
        getAllBook: builder.query<BookState[], string>({
            query: body => ({
                url: `books/getAllBook`,
                headers: { Authorization: `Bearer ${body}` },
                validateStatus: (response, result) =>
                    response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveBookReducer({ data: data.data })); // Save data in store, using reducer
                } catch (err) {
                    // console.log('error api getAllBook... ', err);
                }
            },
        }),
        getAllBookByCategory: builder.query<
            BookState[],
            { token: string; params: string }
        >({
            query: actions => ({
                url: `books/${actions.params}/getBookByIdCategory`,
                headers: {
                    Authorization: `Bearer ${actions.token}`,
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    dispatch(changeLoading('SHOW'));
                    const { data } = await queryFulfilled;
                    dispatch(saveTabCategoryReducer({ data: data.data }));
                    dispatch(changeLoading('HIDE'));

                    // Save data in store, using reducer
                } catch (err) {
                    // console.log('error api getAllBookByCategory... ', err);
                }
            },
            transformResponse: (response: any) => response.data,
        }),
        getAllCategory: builder.query<BookState[], string>({
            query: token => ({
                url: `categories/getAllCategories`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveCategoryReducer({ data: data.data })); // Save data in store, using reducer
                } catch (err) {
                    // console.log('error api getAllCategories... ', err);
                }
            },
        }),
        getAllChapterBook: builder.mutation<
            AllChapterType[],
            { id: string; token: string }
        >({
            query: body => ({
                url: 'books/getChapterBook',
                method: 'POST',
                body: { idBook: body.id },
                headers: { Authorization: `Bearer ${body.token}` },
            }),
            transformResponse: (response: { data: AllChapterType[] }) =>
                response.data,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    dispatch(changeLoading('SHOW'));
                    const { data } = await queryFulfilled;
                    dispatch(changeLoading('HIDE')); // Save data in store, using reducer
                } catch (err) {
                    dispatch(changeLoading('HIDE'));
                    console.log('error api getAllChapterBook... ', err);
                }
            },
        }),
        getDetailChapterBook: builder.query<
            chapterType,
            { id: string; token: string }
        >({
            query: body => ({
                url: `chapters/${body.id}/getChapterDetails`,
                headers: { Authorization: `Bearer ${body.token}` },
            }),
            transformResponse: (response: { data: chapterType }) =>
                response.data,
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                try {
                    getState();
                    const { data } = await queryFulfilled;
                    // Save data in store, using reducer
                } catch (err) {
                    dispatch(changeLoading('HIDE'));
                    console.log('error api getAllChapterBook... ', err);
                }
            },
        }),
    }),
});

export const {
    useGetAllBookQuery,
    useLazyGetAllBookQuery,
    useGetAllBookByCategoryQuery,
    useLazyGetAllBookByCategoryQuery,
    useGetAllCategoryQuery,
    useLazyGetAllCategoryQuery,
    useGetAllChapterBookMutation,
    useGetDetailChapterBookQuery,
} = bookAPI;
