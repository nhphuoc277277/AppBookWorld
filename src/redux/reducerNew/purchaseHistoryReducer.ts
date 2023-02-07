import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PurchaseState = {
    _id?: string;
    purchaseHistory: Array<string>;
};

export type PurchaseArrayState = {
    purchaseHis: PurchaseState[];
};

const defaultPurchaseState: PurchaseArrayState = {
    purchaseHis: [],
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: defaultPurchaseState,
    reducers: {
        savePurchase: (
            state: PurchaseArrayState, 
            action: PayloadAction<PurchaseState[]>,
        ) => {
            state.purchaseHis = action.payload;
            return state;
        },
    },
});

export const { savePurchase } = purchaseSlice.actions;
export const PurchaseHistoryReducer = purchaseSlice.reducer;
