import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { product } from './types';

const initialState = {
  cartItems: [] as product[],
};

export const cartSlice = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<product>) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const initialStateSelector = (state: RootState) => state.sliceExample.cartItems;

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
