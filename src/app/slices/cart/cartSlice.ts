import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { addOns, colors, product, productForCart } from './types';
import findindex from 'lodash.findindex';

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
          item.color.color == action.payload.color.color,
      );
      if (elementInCartIndex >= 0) {
        state.cartItems[elementInCartIndex].quantity += 1;
      } else {
        const productForCart: productForCart = {
          chosenAddOns: action.payload.chosenAddOns ? action.payload.chosenAddOns : [],
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
    minusProductFromCart: (state, action: PayloadAction<productForCart>) => {
      const elementInCartIndex = state.cartItems.findIndex(
        (item) => item.product.id == action.payload.product.id && item.color.color == action.payload.color.color,
      );
      const existingInCartProduct = state.cartItems[elementInCartIndex];
      if (existingInCartProduct && existingInCartProduct.quantity > 1) {
        existingInCartProduct.quantity -= 1;
      } else if (existingInCartProduct.quantity <= 1) {
        state.cartItems.splice(elementInCartIndex, 1);
      }
    },
    updateProductInCart: (state, action: PayloadAction<productForCart>) => {
      const cartItemWithoutParams = state.cartItems.map((item) => item.product);
      const elementInCartIndex = findindex(cartItemWithoutParams, action.payload.product);
      if (elementInCartIndex >= 0) {
        state.cartItems[elementInCartIndex] = action.payload;
      }
    },
  },
});

export interface addProductToCartInterface {
  color: colors;
  size: string;
  product: product;
  chosenAddOns: addOns[];
}

export const cartItemsSelector = (state: RootState) => state.sliceExample.cartItems;

export const { addProductToCart, minusProductFromCart, plusProductInCart, updateProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
