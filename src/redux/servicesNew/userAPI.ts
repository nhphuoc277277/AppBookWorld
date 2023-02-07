import { changeLoading, loginReducer } from '@redux/reducerNew';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Token } from '@stripe/stripe-react-native';

import { MAIN_API } from './endpoint';

export const userApi = createApi({
    reducerPath: 'userAPI',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({ baseUrl: MAIN_API }),
    endpoints: builder => ({
        login: builder.mutation({
            query: body => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                };
            },
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const saveData = {
                        ...data?.data?.account,
                        token: data?.data?.token,
                    };
                    dispatch(loginReducer(saveData));
                } catch (err) {
                    console.log('error api login... ', err);
                }
            },
            invalidatesTags: ['Post'],
        }),
        loginPhoneNumber: builder.mutation({
            query: body => ({
                url: '/accounts/loginNumberPhone',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.data === 'Số điện thoại này chưa đăng ký') {
                    } else if (data.message === 'Mật khẩu không đúng') {
                    } else {
                        const saveData = {
                            ...data?.data?.account,
                            token: data?.data?.token,
                        };
                        dispatch(loginReducer(saveData));
                    }
                } catch (err) {
                    console.log('error api login... ', err);
                }
            },
            invalidatesTags: ['Post'],
        }),
        forgotPassword: builder.mutation({
            query: body => ({
                url: '/accounts/resetPassword',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (err) {
                    console.log('error api forgot password... ', err);
                }
            },
        }),
        loginPhone: builder.mutation({
            query: body => ({
                url: '/accounts/registerNumberPhone',
                method: 'POST',
                body: body,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const saveData = {
                        ...data?.data?.account,
                        token: data?.data?.token,
                    };

                    console.log('==== login phone API ', data);
                    // dispatch(loginReducer(saveData));
                } catch (err) {
                    console.log('error api loginPhone... ', err);
                }
            },
        }),
        getLogin: builder.query({
            query: () => '/auth/login',
            providesTags: ['Post'],
        }),
        getInforUser: builder.query<any, { token: string }>({
            query: body => ({
                url: `accounts/profile`,
                headers: { Authorization: `Bearer ${body.token}` },
            }),
            transformResponse: (response: { data: any }) => response,
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        loginReducer({
                            ...data.data,
                            ...{ token: data.token },
                        }),
                    );
                    // Save data in store, using reducer
                } catch (err) {
                    dispatch(changeLoading('HIDE'));
                    console.log('error api getAllChapterBook... ', err);
                }
            },
        }),
        getAllAccount: builder.query<any, { token: string }>({
            query: ({ token }) => ({
                url: `accounts/getAllUsers`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: { data: any }) => response,
        }),
    }),
});

export const {
    useLoginMutation,
    useGetLoginQuery,
    useLoginPhoneMutation,
    useLoginPhoneNumberMutation,
    useForgotPasswordMutation,
    useLazyGetInforUserQuery,
    useGetAllAccountQuery,
} = userApi;
