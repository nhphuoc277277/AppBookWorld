import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ReadingState = {
    target: number;
    progressInDay: number;
    timeEndInDay: string;
};

const defaultReadingState: ReadingState = {
    target: 15,
    progressInDay: 0,
    timeEndInDay: 'Sun, 20 Nov 2022 04:33:47 +0000	',
};

const readingSlice = createSlice({
    name: 'reading',
    initialState: defaultReadingState,
    reducers: {
        saveReadingReducer: (
            state: ReadingState,
            action: PayloadAction<ReadingState>,
        ) => {
            state = action.payload;
        },
        changeTimeReducer: (
            state: ReadingState,
            action: PayloadAction<number>,
        ) => {
            state.progressInDay = action.payload;
        },
    },
});

export const { saveReadingReducer, changeTimeReducer } = readingSlice.actions;
export const ReadingReducer = readingSlice.reducer;
