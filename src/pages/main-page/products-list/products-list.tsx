import React from 'react';
import data from '../../../mock-data/mock-data.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './products-list.scss';
import { StyledCardMedia } from './products-list.styles';
import { Box, PopperPlacementType } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Masonry from '@mui/lab/Masonry';
import styled from '@mui/styled-engine-sc';
import { product } from '../../../app/slices/cart/types';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../app/store';
import { addProductToCart } from '../../../app/slices/cart/cartSlice';

function ProductsList() {
  const dispatch = useAppDispatch();
  const productsInstance: product[] = data;
  const addToCart = (product: product) => {
    dispatch(addProductToCart(product));
  };


  return (
    <Box>
      <Masonry columns={4} spacing={2} sx={{ marginLeft: '0' }}>
        {productsInstance.map((product, index) => {
          const height = 150 + Math.random() * 50;
          return (
            <Card>
              <StyledCardMedia
                component='img'
                height={height}
                image={product.image}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {product.title}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: 'auto', height: 'min-content' }}>
                <Button size='small' onClick={() => addToCart(product)}><AddShoppingCartIcon /></Button>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}

export default ProductsList;