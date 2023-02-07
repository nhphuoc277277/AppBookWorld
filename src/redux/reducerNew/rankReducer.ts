import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RankState = {
    _id?: string;
    name?: string;
    timeread?: string;
    historyBookRead?: string;
    image: string;
};

export type RankArrayState = {
    ranks: RankState[];
};

const defaultRankState: RankArrayState = {
    ranks: [],
};

const rankSlice = createSlice({
    name: 'rank',
    initialState: defaultRankState,
    reducers: {
        saveRank: (
            state: RankArrayState, 
            action: PayloadAction<RankState[]>,
        ) => {
            state.ranks = action.payload;
            return state;
        },
    },
});

export const { saveRank } = rankSlice.actions;
export const RankReducer = rankSlice.reducer;
