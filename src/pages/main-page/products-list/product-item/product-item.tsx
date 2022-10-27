import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import { StyledCardMedia } from '../products-list.styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { product, productForCart } from '../../../../app/slices/cart/types';
import { useAppDispatch } from '../../../../app/store';
import data from '../../../../mock-data/mock-data.json';
import { addProductToCart } from '../../../../app/slices/cart/cartSlice';

function ProductItem(props: {product: product, itemsInCartList: productForCart[]}) {
  const {product, itemsInCartList} = props
  const dispatch = useAppDispatch();
  const addToCart = (product: product) => {
    dispatch(addProductToCart(product));
  };
  const itemInCart = () => {
    const elementInCartIndex = itemsInCartList.findIndex((item) => item.product.id == product.id);
    const ItemInCart = itemsInCartList[elementInCartIndex]

    if (ItemInCart) {
      const ItemInCartQuantity = ItemInCart.quantity;
      if (ItemInCartQuantity) {
        return <span>{ItemInCartQuantity}</span>;
      }
    }
  };
  const tempHeight = 150 + Math.random() * 50;
  const height = useRef(tempHeight);
  return (
    <Card>
      <StyledCardMedia component="img" height={height.current} image={product.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto', height: 'min-content' }}>
        <Button size="small" onClick={() => addToCart(product)}>
          <AddShoppingCartIcon />
          {itemInCart()}
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductItem);