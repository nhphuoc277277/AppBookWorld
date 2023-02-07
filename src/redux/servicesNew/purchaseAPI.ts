import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MAIN_API } from './endpoint';
import { savePurchase } from '@redux/reducerNew';

type PurchaseState = {
    _id?: string;
    purchaseHistory?: Array<string>;
};
export const purchaseAPI = createApi({
    reducerPath: 'purchaseAPI',
    tagTypes: [],
    baseQuery: fetchBaseQuery({
        baseUrl: MAIN_API,
    }),
    endpoints: builder => ({
        getPurchaseHistoryCart: builder.query<PurchaseState[], string>({
            query: token => {
                return {
                    url: 'accounts/getpurchaseCart',
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                };
            },
            transformResponse: (response: { data: PurchaseState[] }) =>
                response.data,
        }),
    }),
});

export const {
    useGetPurchaseHistoryCartQuery,
    useLazyGetPurchaseHistoryCartQuery,
} = purchaseAPI;
