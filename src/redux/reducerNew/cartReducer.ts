import {
    createSlice,
    PayloadAction,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { keys } from 'lodash';

const cartAdapter = createEntityAdapter();
export type CartState = {
    _id: string;
    name: string;
    isPrice: number;
    image: string;
    introduction: string;
    chapter?: {
        [key: number]: ChapterState;
    };
    status: boolean;
};

type ChapterState = {
    idChapter: string;
    title: string;
    price: number;
    chapterNumber: number;
};

export type CartList = {
    cartList: Array<CartState>;
};

const defaultCartState: CartList = {
    cartList: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: defaultCartState,
    reducers: {
        saveCartReducer: (
            state: CartList,
            action: PayloadAction<CartState>,
        ) => {
            state.cartList = [...state.cartList, action.payload];
            return state;
        },
        saveStatusCartReducer: (
            state: CartList,
            action: PayloadAction<{ index: number; status: boolean }>,
        ) => {
            state.cartList[action.payload.index].status = action.payload.status;
        },
        saveChapterReducer: (
            state: CartList,
            action: PayloadAction<{ data: ChapterState; index: number }>,
        ) => {
            state.cartList[action.payload.index].chapter[
                action.payload.data.chapterNumber || 0
            ] = action.payload.data;
        },
        removeItem: (state, action) => {
            let cart = state.cartList;
            let arr = cart.filter(item => item._id !== action.payload._id);
            state.cartList = arr;
        },
        removeChapter: (state, action) => {
            const { idBook, idChapter } = action.payload;
            state.cartList.map((item, index) => {
                if (item._id === idBook) {
                    let chapter = item.chapter || {};
                    delete chapter[idChapter];
                    state.cartList[index].chapter = chapter;
                    return;
                }
            });
        },
        removeBookPayment: (state: CartList, action) => {
            const data = action.payload;
            let newCart: CartState[] = [];

            state.cartList.forEach(item => {
                let flag = false;
                for (const _id of data) {
                    if (item._id === _id) {
                        flag = true;
                        return;
                    }
                }
                if (!flag) {
                    newCart.push(item);
                }
            });

            state.cartList = newCart;
        },
    },
});
export const {
    saveCartReducer,
    saveChapterReducer,
    saveStatusCartReducer,
    removeItem,
    removeChapter,
    removeBookPayment,
} = cartSlice.actions;
export const CartReducer = cartSlice.reducer;
