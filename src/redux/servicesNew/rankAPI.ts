import { saveRank } from '@redux/reducerNew';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';

type RankState = {
    _id?: string;
    name?: string;
    timeread?: string;
    historyBookRead?: string;
    image: string;
};
export const rankAPI = createApi({
    reducerPath: 'rankAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getCountTop10: builder.query<RankState[], string>({
            query: token => ({
                url: `accounts/getCountTop10`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(saveRank(data));
                } catch (err) {
                    console.log('error api getCountTop10... ', err);
                }
            },
        }),
    }),
});

export const { useGetCountTop10Query, useLazyGetCountTop10Query } = rankAPI;
