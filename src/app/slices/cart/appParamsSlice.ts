import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
    addOnsLimit: 2,
    backgroundColor: '#fff',
};

export const appParamsSlice = createSlice({
    name: 'appParamsSlice',
    initialState,
    reducers: {
        setAddOnsLimit: (state, action: PayloadAction<number>) => {
            if (!isNaN(action.payload)) {
                state.addOnsLimit = action.payload;
            }
        },
        setBackgroundColor: (state, action: PayloadAction<string>) => {
            state.backgroundColor = action.payload
        },
    },
})
export const addOnsLimitSelector = (state: RootState) => state.appParamsSlice.addOnsLimit;
export const backgroundColorSelector = (state: RootState) => state.appParamsSlice.backgroundColor;

export const { setAddOnsLimit, setBackgroundColor } = appParamsSlice.actions

export default appParamsSlice.reducer;