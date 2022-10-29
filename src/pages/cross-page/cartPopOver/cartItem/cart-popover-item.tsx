import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { PopOverCartItemDescription } from '../../navbar.styles';
import CartProductQuantityBar from '../cart-product-quantity-bar';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { productForCart } from '../../../../app/slices/cart/types';
import { ColorCircle } from '../../components/color-options/color-options.styles';
import ProductInCartParameter from './ProductInCartParameter';
import { CartPopoverImageWrapper, ProductInCartParamWrapper } from './cart-popover-item.styles';
import ItemDialog from '../../../main-page/item/item-dialog/item-dialog';

function CartPopoverItem(props: { item: productForCart; children?: JSX.Element[] }) {
  const { item } = props;
  const itemImageUrl = item.product.colors.find((color) => color.color == item.color.color);
  const [openItemOverviewModal, setOpenItemOverviewModal] = useState(false);
  const handleCloseItemModal = () => {
    setOpenItemOverviewModal(false);
  };
  const handleOpenItemModal = () => {
    setOpenItemOverviewModal(true);
  };
  return (
    <Card sx={{ display: 'flex', maxWidth: '600px', width: 'auto' }} key={item.product.id}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.product.title}
          </Typography>
          <Stack direction={'column'} spacing={1}>
            <ProductInCartParamWrapper elevation={2}>
              <Typography component="div" variant="subtitle2">
                Color:
              </Typography>
              <ColorCircle color={item.color.color} />
            </ProductInCartParamWrapper>
            <ProductInCartParameter field={`Size: ${item.size}`}></ProductInCartParameter>
            <ProductInCartParameter field={`Price: $${item.product.price}`}></ProductInCartParameter>
          </Stack>

          <PopOverCartItemDescription variant="subtitle1" color="text.secondary" component="div">
            {item.product.description}
          </PopOverCartItemDescription>
        </CardContent>
        {!props.children && (
          <CartProductQuantityBar item={item} productColor={item.color} activeProductSizeOption={item.size} />
        )}
        {props.children && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <CartProductQuantityBar activeProductSizeOption={item.size} item={item} productColor={item.color} />
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
      />
      {/*<OverviewItem id={item.product.id} handleCloseItemModal={handleCloseItemModal}/>*/}
    </Card>
  );
}

export default CartPopoverItem;
