import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoadingState = {
    isLoading: 'HIDE' | 'SHOW';
};

const defaultLoadingState: LoadingState = {
    isLoading: 'HIDE',
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState: defaultLoadingState,
    reducers: {
        changeLoading(
            state: LoadingState,
            action: PayloadAction<'HIDE' | 'SHOW'>,
        ) {
            state.isLoading = action.payload;
        },
    },
});

export const { changeLoading } = loadingSlice.actions;

export const LoadingReducer = loadingSlice.reducer;
