import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { addOns, colors, product, productForCart } from './types';
import findindex from 'lodash.findindex';

const initialState = {
  cartItems: [] as productForCart[],
  totalPrice: 0,
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
      state.totalPrice = calculateTotalPrice(state);
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
      state.totalPrice = calculateTotalPrice(state);
    },
    updateProductInCart: (state, action: PayloadAction<productForCart>) => {
      const cartItemWithoutParams = state.cartItems.map((item) => item.product);
      const elementInCartIndex = findindex(cartItemWithoutParams, action.payload.product);
      if (elementInCartIndex >= 0) {
        state.cartItems[elementInCartIndex] = action.payload;
      }
      state.totalPrice = calculateTotalPrice(state);
    },
  },
});

function calculateTotalPrice(state: Draft<any>) {
  const productsPrice = state.cartItems.reduce(
    (previousValue: number, currentValue: { product: { price: number }; quantity: number }) =>
      previousValue + currentValue.product.price * currentValue.quantity,
    0,
  );
  let addonsPrice = 0;
  for (let i = 0; i < state.cartItems.length; i++) {
    const chosenAddOnsNames = Object.keys(state.cartItems[i].chosenAddOns);
    for (let j = 0; j < state.cartItems[i].product.addOns.length; j++) {
      for (let k = 0; k < chosenAddOnsNames.length; k++) {
        if (state.cartItems[i].product.addOns[j].title == chosenAddOnsNames[k] && state.cartItems[i].chosenAddOns[chosenAddOnsNames[k]]==true) {
          addonsPrice += state.cartItems[i].product.addOns[j].price;
        }
      }
    }
  }
  return productsPrice + addonsPrice;
}

export interface addProductToCartInterface {
  color: colors;
  size: string;
  product: product;
  chosenAddOns: addOns[];
}

export const cartItemsSelector = (state: RootState) => state.sliceExample.cartItems;
export const totalPriceSelector = (state: RootState) => state.sliceExample.totalPrice;

export const { addProductToCart, minusProductFromCart, updateProductInCart } = cartSlice.actions;

export default cartSlice.reducer;
