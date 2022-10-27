import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { product, productForCart } from '../../../app/slices/cart/types';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { cartItemsSelector, minusProductFromCart, plusProductInCart } from '../../../app/slices/cart/cartSlice';
import SimpleDialogDemo from './approveProductRemoval';

export const FindAllProductsWithDifferentParams = (itemToAdd: product) => {
  const allCartItems = useAppSelector(cartItemsSelector);
  if (allCartItems) {
    const allProducts = allCartItems.filter((elem) => elem.product.id === itemToAdd.id);
    return allProducts.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  }
};

function CartProductQuantityBar(props: { item: productForCart }) {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const addItem = () => {
    dispatch(plusProductInCart(props.item.product));
  };
  const deleteItemAction = (id: number) => {
    dispatch(minusProductFromCart(id));
  };
  const removeItem = () => {
    if (props.item.quantity <= 1) {
      setDialogOpen(true);
    } else deleteItemAction(props.item.product.id);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
      <IconButton aria-label="previous">
        <RemoveCircleIcon onClick={removeItem} />
      </IconButton>
      <Typography>{props.item.quantity}</Typography>
      <IconButton aria-label="next">
        <AddCircleIcon onClick={() => addItem()} />
      </IconButton>
      <SimpleDialogDemo
        itemId={props.item.product.id}
        open={dialogOpen}
        setOpen={setDialogOpen}
        deleteItemAction={deleteItemAction}
      />
    </Box>
  );
}

export default CartProductQuantityBar;
