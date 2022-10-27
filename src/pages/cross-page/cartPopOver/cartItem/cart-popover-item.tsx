import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { PopOverCartItemDescription } from '../../navbar.styles';
import CartProductQuantityBar from '../cart-product-quantity-bar';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { productForCart } from '../../../../app/slices/cart/types';
import { Link } from 'react-router-dom';
import { ColorCircle } from '../../components/color-options/color-options.styles';

function CartPopoverItem(props: { item: productForCart; children?: JSX.Element[] }) {
  const { item } = props;
  return (
    <Card sx={{ display: 'flex', width: '600px' }} key={item.product.id}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.product.title}
          </Typography>
          <Stack alignItems={'center'} direction={'row'}>
            <Typography component="div" variant="subtitle2">
              Color:
            </Typography>
            <ColorCircle color={item.color} />
          </Stack>
          <Typography component="div" variant="subtitle2">
            Size: {item.size}
          </Typography>
          <PopOverCartItemDescription variant="subtitle1" color="text.secondary" component="div">
            {item.product.description}
          </PopOverCartItemDescription>
        </CardContent>
        {props.children && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <CartProductQuantityBar item={item} />
            <div>{props.children}</div>
          </Stack>
        )}
      </Box>
      <Link to={`/item/${item.product.id}`}>
        <CardMedia component="img" sx={{ width: 151 }} image={item.product.image} alt="Live from space album cover" />
      </Link>
    </Card>
  );
}

export default CartPopoverItem;
