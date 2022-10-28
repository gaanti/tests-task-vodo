import React, { useMemo, useState } from 'react';
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
import { TotalQtyOfItemInCart } from '../../../cross-page/cartPopOver/cart-product-quantity-bar';

function ProductItem(props: {
  product: product;
  itemsInCartList: productForCart[];
  blockWidth?: number;
  blockHeight?: number;
  fixedBlockHeightBool?: boolean;
}) {
  const { product } = props;
  const dispatch = useAppDispatch();
  const [productColor, setProductColor] = useState(product.colors[0]);
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(product ? product.sizes[0] : '');
  const itemInCartQty = TotalQtyOfItemInCart(product);
  const addProduct: addProductToCartInterface = {
    color: productColor,
    product: props.product,
    size: activeProductSizeOption,
  };
  const addToCart = () => {
    dispatch(addProductToCart(addProduct));
  };
  const height = useMemo(() => {
    const defaultHeight = props.blockHeight ? props.blockHeight : 150;
    const randomizedHeightAdjustment = !props.fixedBlockHeightBool ? Math.random() * 50 : 0;
    return defaultHeight + randomizedHeightAdjustment;
  }, [props.blockHeight, props.fixedBlockHeightBool]);

  return (
    <Card sx={{ minWidth: props.blockWidth }}>
      <Link to={`item/${product.id}`}>
        <StyledCardMedia component="img" height={height} image={productColor.url} />
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
        <Button size="small" onClick={() => addToCart()}>
          <AddShoppingCartIcon />
          {itemInCartQty && itemInCartQty > 0 ? itemInCartQty : ''}
        </Button>
      </CardActions>
    </Card>
  );
}

export default React.memo(ProductItem);
