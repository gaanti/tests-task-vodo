import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { product, productForCart } from './types';

const initialState = {
  cartItems: [] as productForCart[],
};

export const cartSlice = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<addProductToCartInterface>) => {
      const elementInCartIndex = state.cartItems.findIndex(
        (item) =>
          item.product.id == action.payload.product.id &&
          item.size == action.payload.size &&
          item.color == action.payload.color,
      );
      if (elementInCartIndex >= 0) {
        state.cartItems[elementInCartIndex].quantity += 1;
      } else {
        const productForCart: productForCart = {
          color: action.payload.color,
          size: action.payload.size,
          quantity: 1,
          product: action.payload.product,
        };
        state.cartItems.push(productForCart);
      }
    },
    plusProductInCart: (state, action: PayloadAction<product>) => {
      const elementInCartIndex = state.cartItems.findIndex((item) => item.product.id == action.payload.id);
      if (elementInCartIndex >= 0) {
        state.cartItems[elementInCartIndex].quantity += 1;
      }
    },
    minusProductFromCart: (state, action: PayloadAction<number>) => {
      const elementInCartIndex = state.cartItems.findIndex((item) => item.product.id == action.payload);
      const existingInCartProduct = state.cartItems[elementInCartIndex];
      if (existingInCartProduct && existingInCartProduct.quantity > 1) {
        existingInCartProduct.quantity -= 1;
      } else if (existingInCartProduct.quantity <= 1) {
        state.cartItems.splice(elementInCartIndex, 1);
      }
    },
  },
});

export interface addProductToCartInterface {
  color: string;
  size: string;
  product: product;
}

export const cartItemsSelector = (state: RootState) => state.sliceExample.cartItems;

export const { addProductToCart, minusProductFromCart, plusProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
