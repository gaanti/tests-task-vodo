import React from 'react';
import { productForCart } from '../../../app/slices/cart/types';

function CartItem(props: { item: productForCart }) {
  const { item } = props;
  return <div>{item.product.title}</div>;
}

export default CartItem;
