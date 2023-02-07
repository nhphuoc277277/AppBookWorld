import { changeLoading } from '@redux/reducerNew';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { string } from 'prop-types';
import { AnyAction } from 'redux';

import { MAIN_API } from './endpoint';

export type RoomState = {
    _id: string;
    name: string;
    image: string;
    users: Array<string>;
    createdBy: string;
    createdAt: string;
};

export type ChatState = {
    _id: string;
    name: string;
    image: string;
    users: Array<string>;
    createdBy: string;
    createdAt: string;
};

type MessageState = {
    fromSelf: boolean;
    message: string;
    createdAt: string;
    name: string;
    avatar: string;
};

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getRoomChat: builder.query<RoomState[], string>({
            query: token => {
                return {
                    url: 'rooms/get-rooms',
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                };
            },
            transformResponse: (response: { data: ChatState[] }) =>
                response.data,
        }),
        getChats: builder.mutation<
            MessageState[],
            { token: string; room: string }
        >({
            query: body => {
                return {
                    url: 'messages/get-message',
                    method: 'POST',
                    headers: { Authorization: `Bearer ${body.token}` },
                    body: { room: body.room },
                };
            },
            transformResponse: (response: { data: MessageState[] }) =>
                response.data,
        }),
        sendMessage: builder.mutation<
            MessageState[],
            { token: string; room: string; message: string; file: any }
        >({
            query: body => {
                return {
                    url: 'messages/send-message',
                    method: 'POST',
                    headers: { Authorization: `Bearer ${body.token}` },
                    body: {
                        message: body.message,
                        room: body.room,
                        file: body.file,
                    },
                };
            },
            transformResponse: (response: { data: MessageState[] }) =>
                response.data,
        }),
        createGroup: builder.mutation<
            MessageState[],
            {
                formData: { name: string; image: string; users: [] };
                token: string;
            }
        >({
            query: body => {
                return {
                    url: 'rooms/create-room',
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${body.token}`,
                    },
                    body: body.formData,
                };
            },
            transformResponse: (response: any) => response,
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
        // createGroup: builder.mutation<
        //     MessageState[],
        //     {
        //         bodySend: { name: string; image: string; users: [] };
        //         token: string;
        //     }
        // >({
        //     query: body => {
        //         return {
        //             url: 'rooms/create-room',
        //             method: 'POST',
        //             headers: { Authorization: `Bearer ${body.token}` },
        //             body: body.bodySend,
        //         };
        //     },
        //     transformResponse: (response: any) => response,
        //     async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //         try {
        //             dispatch(changeLoading('SHOW'));
        //             const { data } = await queryFulfilled;
        //             dispatch(changeLoading('HIDE')); // Save data in store, using reducer
        //         } catch (err) {
        //             dispatch(changeLoading('HIDE'));
        //             console.log('error api getAllChapterBook... ', err);
        //         }
        //     },
        // }),
    }),
});

export const {
    useLazyGetRoomChatQuery,
    useGetRoomChatQuery,
    useGetChatsMutation,
    useSendMessageMutation,
    useCreateGroupMutation,
} = chatAPI;
