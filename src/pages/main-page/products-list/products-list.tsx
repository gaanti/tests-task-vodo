import React from 'react';
import data from '../../../mock-data/mock-data.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './products-list.scss';
import { StyledCardMedia } from './products-list.styles';
import { Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Masonry from '@mui/lab/Masonry';
import { product } from '../../../app/slices/cart/types';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { addProductToCart, initialStateSelector } from '../../../app/slices/cart/cartSlice';
import ProductItem from './product-item/product-item';

function ProductsList() {
  const productsInstance: product[] = data;
  const itemsInCartList = useAppSelector(initialStateSelector);

  return (
    <Box>
      <Masonry columns={4} spacing={2} sx={{ marginLeft: '0' }}>
        {productsInstance.map((product, index) => {
          return (
            <ProductItem product={product} itemsInCartList={itemsInCartList}/>
          );
        })}
      </Masonry>
    </Box>
  );
}

export default ProductsList;
