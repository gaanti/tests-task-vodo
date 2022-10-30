import React, { useState } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { PopOverCartItemDescription } from '../../navbar.styles';
import ProductQtyBar from '../product-qty-bar';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { productForCart } from '../../../../app/slices/cart/types';
import { ColorCircle } from '../../components/color-options/color-options.styles';
import ProductParam from './product-param';
import { CartPopoverImageWrapper, ProductInCartParamWrapper } from './modal-cart-item.styles';
import ItemDialog from '../../../main-page/overview-item/item-dialog/item-dialog';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../../../../app/slices/cart/cartSlice';
import findindex from 'lodash.findindex';

function CartItem(props: { item: productForCart; children?: JSX.Element[] }) {
  const cartItems = useSelector(cartItemsSelector);
  const { item } = props;
  const itemImageUrl = item.product.colors.find((color) => color.color == item.color.color);
  const [openItemOverviewModal, setOpenItemOverviewModal] = useState(false);
  const handleCloseItemModal = () => {
    setOpenItemOverviewModal(false);
  };
  const handleOpenItemModal = () => {
    setOpenItemOverviewModal(true);
  };
  const calculateAddOnsCost = () => {
    const itemIndex = findindex(cartItems, item);
    let addonsPrice = 0
    if (itemIndex > -1) {
      const currentCartItem = cartItems[itemIndex];
      const chosenAddOnsNames = Object.keys(currentCartItem.chosenAddOns);
      for (let j = 0; j < currentCartItem.product.addOns.length; j++) {
        for (let k = 0; k < chosenAddOnsNames.length; k++) {
          if (
            currentCartItem.product.addOns[j].title == chosenAddOnsNames[k] &&
            // @ts-ignore
            currentCartItem.chosenAddOns[chosenAddOnsNames[k]] == true
          ) {
            addonsPrice += currentCartItem.product.addOns[j].price;
          }
        }
      }
    }
    return addonsPrice;
  };
  const addOnsCost = calculateAddOnsCost();

  return (
    <Card sx={{ display: 'flex', maxWidth: '600px', width: 'auto' }} key={item.product.id}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.product.title}
          </Typography>
          <Stack direction={'column'} spacing={1} width={'100%'}>
            <ProductInCartParamWrapper elevation={2}>
              <Typography component="div" variant="subtitle2">
                Color:
              </Typography>
              <ColorCircle color={item.color.color} />
            </ProductInCartParamWrapper>
            <ProductParam>Size: {item.size}</ProductParam>
            <ProductParam>
              {addOnsCost > 0 &&
                <Stack justifyContent={'space-between'} width={'100%'} direction={'row'}>
                  <span>Add-ons: </span>
                  <span>${addOnsCost}</span>
                </Stack>
              }
              {addOnsCost > 0 &&
                <Stack justifyContent={'space-between'} width={'100%'} direction={'row'}>
                  <span>Cloth: </span>
                  <span>${item.product.price * item.quantity}</span>
                </Stack>
              }
              <Divider />
              <Stack justifyContent={'space-between'} width={'100%'} direction={'row'}>
                <span>Total: </span>
                <span>${item.product.price * item.quantity + addOnsCost}</span>
              </Stack>
            </ProductParam>
          </Stack>

          <PopOverCartItemDescription variant="subtitle1" color="text.secondary" component="div">
            {item.product.description}
          </PopOverCartItemDescription>
        </CardContent>
        {!props.children && <ProductQtyBar item={item} activeProductSizeOption={item.size} />}
        {props.children && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <ProductQtyBar activeProductSizeOption={item.size} item={item} />
            <div>{props.children}</div>
          </Stack>
        )}
      </Box>
      <CartPopoverImageWrapper onClick={handleOpenItemModal}>
        <CardMedia
          component="img"
          sx={{ width: 151, height: '100%' }}
          image={itemImageUrl!.url}
          alt="Added to cart item"
        />
      </CartPopoverImageWrapper>
      <ItemDialog
        handleCloseItemModal={handleCloseItemModal}
        handleOpenItemModal={handleOpenItemModal}
        openItemModal={openItemOverviewModal}
        product={item.product}
        productExistingInCart={item}
        mode="configure"
      />
    </Card>
  );
}

export default CartItem;
