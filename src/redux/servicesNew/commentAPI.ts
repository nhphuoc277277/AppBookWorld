import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';

type CommentState = {
    _id?: string;
    idChapter?: string;
    userName?: string;
    content?: string;
    image: string;
    time?: string;
};

export const commentAPI = createApi({
    reducerPath: 'commentAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getAllComment: builder.query<
            CommentState[],
            { params: string; token: string }
        >({
            query: ({ params, token }) => ({
                url: `books/${params}/getCommentChapter`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            // transformResponse: (response: any) => response,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (err) {
                    console.log('error api getAllComment... ', err);
                }
            },
        }),

        postComment: builder.mutation({
            query: ({ body, token }) => {
                return {
                    url: 'comments/postComment',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),
    }),
});

export const {
    useGetAllCommentQuery,
    useLazyGetAllCommentQuery,
    usePostCommentMutation,
} = commentAPI;
