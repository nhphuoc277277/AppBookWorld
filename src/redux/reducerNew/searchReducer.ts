import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchState = {
    _id?: string;
    value?: string;
};

export type SearchList = {
    searchList: Array<SearchState>;
};

const defaultSearchState: SearchList = {
    searchList: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState: defaultSearchState,
    reducers: {
        saveSearchReducer: (
            state: SearchList,
            action: PayloadAction<SearchState>,
        ) => {
            state.searchList = [
                action.payload,
                ...state.searchList.slice(0, 4),
            ];
        },
        deleteSearch: (state: SearchList, action: PayloadAction<number>) => {
            let searchList = state.searchList;
            const dataDelete = searchList.filter(
                (item, index) => index !== action.payload,
            );
            state.searchList = dataDelete;
        },
    },
});

export const { saveSearchReducer, deleteSearch } = searchSlice.actions;
export const SearchReducer = searchSlice.reducer;
