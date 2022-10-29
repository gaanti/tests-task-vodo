import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { colors, product, productForCart } from '../../../app/slices/cart/types';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import {
  addProductToCart,
  addProductToCartInterface,
  cartItemsSelector,
  minusProductFromCart,
} from '../../../app/slices/cart/cartSlice';
import SimpleDialogDemo from './approveProductRemoval';

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

function CartProductQuantityBar(props: {
  item: productForCart;
  activeProductSizeOption: string;
  productColor: colors;
}) {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const allCartItems = useAppSelector(cartItemsSelector);
  const currentProductInCart = allCartItems.find((item) => {
    return item.color.color == props.productColor.color && item.product.id == props.item.product.id;
  });

  const addItem = () => {
    if (currentProductInCart) {
      const asd: addProductToCartInterface = {
        color: props.productColor,
        product: currentProductInCart.product,
        size: props.activeProductSizeOption,
      };
      dispatch(addProductToCart(asd));

    } else dispatch(addProductToCart(props.item));
  };


  const deleteItemAction = (currentProductInCart: productForCart) => {
    dispatch(minusProductFromCart(currentProductInCart));
  };
  const smth = () => {
    if (currentProductInCart) {
      if (currentProductInCart.quantity == 1) {
        setDialogOpen(true);
      } else deleteItemAction(currentProductInCart);
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton aria-label="previous">
        <RemoveCircleIcon onClick={smth} />
      </IconButton>
      <Typography>{currentProductInCart ? currentProductInCart.quantity : 0}</Typography>
      <IconButton aria-label="next">
        <AddCircleIcon onClick={() => addItem()} />
      </IconButton>
      {currentProductInCart && (
        <SimpleDialogDemo
          item={currentProductInCart}
          open={dialogOpen}
          setOpen={setDialogOpen}
          deleteItemAction={deleteItemAction}
        />
      )}
    </Box>
  );
}

export default CartProductQuantityBar;
