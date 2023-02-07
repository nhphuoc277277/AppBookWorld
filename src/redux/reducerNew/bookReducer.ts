import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

type CategoryState = {
    _id: string;
    name: string;
    image: string;
    description: string;
};

export type BookList = {
    bookList: Array<BookState>;
    categoryList: Array<CategoryState>;
    tabList: Array<BookState>;
    favoriteList: Array<BookState>;
};

const defaultBookState: BookList = {
    bookList: [],
    categoryList: [],
    tabList: [],
    favoriteList: [],
};

const bookSlice = createSlice({
    name: 'book',
    initialState: defaultBookState,
    reducers: {
        saveBookReducer: (
            state: BookList,
            action: PayloadAction<{ data: BookState[] }>,
        ) => {
            state.bookList = action.payload.data;
            return state;
        },
        saveCategoryReducer: (
            state: BookList,
            action: PayloadAction<{ data: Array<CategoryState> }>,
        ) => {
            state.categoryList = action.payload.data;
            return state;
        },
        saveTabCategoryReducer: (
            state: BookList,
            action: PayloadAction<{ data: Array<BookState> }>,
        ) => {
            state.tabList = action.payload.data;
            return state;
        },
        saveFavoriteBookReducer: (
            state: BookList,
            action: PayloadAction<{ data: Array<BookState> }>,
        ) => {
            state.favoriteList = action.payload.data;
            return state;
        },
    },
});

export const {
    saveBookReducer,
    saveCategoryReducer,
    saveTabCategoryReducer,
    saveFavoriteBookReducer,
} = bookSlice.actions;
export const BookReducer = bookSlice.reducer;
