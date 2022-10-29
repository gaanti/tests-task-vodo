import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { product, productForCart } from '../../../app/slices/cart/types';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addProductToCart, cartItemsSelector, minusProductFromCart } from '../../../app/slices/cart/cartSlice';
import SimpleDialogDemo from './approveProductRemoval';
function CartProductQuantityBar(props: { item: productForCart; activeProductSizeOption: string }) {
  const { item } = props;
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const addItem = () => {
    dispatch(addProductToCart(item));
  };

  const deleteItemAction = (currentProductInCart: productForCart) => {
    dispatch(minusProductFromCart(currentProductInCart));
  };
  const smth = () => {
    if (item.quantity == 1) {
      setDialogOpen(true);
    } else deleteItemAction(item);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton aria-label="previous">
        <RemoveCircleIcon onClick={smth} />
      </IconButton>
      <Typography>{item.quantity}</Typography>
      <IconButton aria-label="next">
        <AddCircleIcon onClick={() => addItem()} />
      </IconButton>
      <SimpleDialogDemo item={item} open={dialogOpen} setOpen={setDialogOpen} deleteItemAction={deleteItemAction} />
    </Box>
  );
}

export const ArrOfItemInCart = (itemToAdd: product) => {
  const allCartItems = useAppSelector(cartItemsSelector);
  if (allCartItems) {
    return allCartItems.filter((elem) => elem.product.id === itemToAdd.id);
  }
};
export const TotalQtyOfItemInCart = (itemToAdd: product) => {
  const arr = ArrOfItemInCart(itemToAdd);
  if (arr) {
    return arr.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  }
};

export default CartProductQuantityBar;

