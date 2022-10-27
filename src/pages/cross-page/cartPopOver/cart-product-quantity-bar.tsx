import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { productForCart } from '../../../app/slices/cart/types';
import { useAppDispatch } from '../../../app/store';
import { addProductToCart, minusProductFromCart } from '../../../app/slices/cart/cartSlice';
import SimpleDialogDemo from './approveProductRemoval';

function CartProductQuantityBar(props: { item: productForCart }) {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const addItem = () => {
    dispatch(addProductToCart(props.item.product));
  };
  const deleteItemAction = (id: number) => {
    dispatch(minusProductFromCart(id))
  }
  const removeItem = () => {
    if (props.item.quantity <= 1) {
      setDialogOpen(true);
    } else deleteItemAction(props.item.product.id )
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