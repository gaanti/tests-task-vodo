import React, { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import { StyledCardMedia } from '../products-list.styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { product, productForCart } from '../../../../app/slices/cart/types';
import { useAppDispatch } from '../../../../app/store';
import { addProductToCart, addProductToCartInterface } from '../../../../app/slices/cart/cartSlice';
import { Link } from 'react-router-dom';
import './product-item.scss';
import ColorOptions from '../../../cross-page/components/color-options/color-options';
import SizeOptions from '../../../cross-page/components/size-options/size-options';
import { Stack } from '@mui/material';
import { FindAllProductsWithDifferentParams } from '../../../cross-page/cartPopOver/cart-product-quantity-bar';

function ProductItem(props: {
  product: product;
  itemsInCartList: productForCart[];
  blockWidth?: number;
  blockHeight?: number;
  fixedBlockHeightBool?: boolean;
}) {
  const { product, itemsInCartList } = props;
  const [productColor, setProductColor] = useState(product.colors[0].color);
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(product ? product.sizes[0] : '');
  const dispatch = useAppDispatch();
  const addProduct: addProductToCartInterface = {
    color: productColor,
    product: props.product,
    size: activeProductSizeOption,
  };
  const addToCart = (product: product) => {
    dispatch(addProductToCart(addProduct));
  };
  const itemInCart = () => {
    const elementInCartIndex = itemsInCartList.findIndex((item) => item.product.id == product.id);
    const ItemInCart = itemsInCartList[elementInCartIndex];

    if (ItemInCart) {
      const ItemInCartQuantity = ItemInCart.quantity;
      if (ItemInCartQuantity) {
        return <span>{ItemInCartQuantity}</span>;
      }
    }
  };

  const tempHeight = props.blockHeight ? props.blockHeight + Math.random() * 50 : 150 + Math.random() * 50;
  const height = useRef(tempHeight);
  const itemInCartQty = FindAllProductsWithDifferentParams(product);

  return (
    <Card sx={{ minWidth: props.blockWidth }}>
      <Link to={`item/${product.id}`}>
        <StyledCardMedia component="img" height={height.current} image={product.colors[0].url} />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          marginTop: 'auto',
          height: 'min-content',
          display: 'flex',
          gap: '7px',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Stack spacing={2}>
          <ColorOptions product={product} setProductColor={setProductColor} productColor={productColor} />
          <SizeOptions
            product={product}
            activeProductSizeOption={activeProductSizeOption}
            setActiveProductSizeOption={setActiveProductSizeOption}
          />
        </Stack>
        <Button size="small" onClick={() => addToCart(product)}>
          <AddShoppingCartIcon />
          {itemInCartQty && itemInCartQty > 0 ? itemInCartQty : ''}
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductItem);
