import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthorState = {
    _id: string;
    name: string;
    avatar: string;
    aboutAuthor?: {};
};

export type AuthorArrayState = {
    authors: AuthorState[];
};

const defaultAuthorState: AuthorArrayState = {
    authors: [],
};

const authorSlice = createSlice({
    name: 'author',
    initialState: defaultAuthorState,
    reducers: {
        saveAuthor: (
            state: AuthorArrayState,
            action: PayloadAction<AuthorState[]>,
        ) => {
            state.authors = action.payload;
            return state;
        },
    },
});

export const { saveAuthor } = authorSlice.actions;
export const AuthorReducer = authorSlice.reducer;
