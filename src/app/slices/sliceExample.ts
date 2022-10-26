import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  initialState: '',
};

export const sliceExample = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<string>) => {
      state.initialState = action.payload;
    },
  },
});

export const initialStateSelector = (state: RootState) => state.sliceExample.initialState;

export const { setInitialState } = sliceExample.actions;

export default sliceExample.reducer;
