import React from 'react';
import data from '../../../mock-data/mock-data.json';
import './products-list.scss';
import { Box } from '@mui/material';

import Masonry from '@mui/lab/Masonry';
import { product } from '../../../app/slices/cart/types';
import { useAppSelector } from '../../../app/store';
import { cartItemsSelector } from '../../../app/slices/cart/cartSlice';
import ProductItem from './product-item/product-item';
import Card from '@mui/material/Card';

function ProductsList() {
  const productsInstance: product[] = data;
  const itemsInCartList = useAppSelector(cartItemsSelector);

  return (
    <Box>
      <Masonry columns={4} spacing={2} sx={{ marginLeft: '0' }}>
        {productsInstance.map((product) => {
          return <ProductItem key={product.id} product={product} itemsInCartList={itemsInCartList} />;
        })}
      </Masonry>
    </Box>
  );
}

export default ProductsList;
