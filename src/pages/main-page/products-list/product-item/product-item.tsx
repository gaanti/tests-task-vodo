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
import ColorOptions from '../../../cross-page/components/color-options/color-options';
import SizeOptions from '../../../cross-page/components/size-options/size-options';
import { Stack } from '@mui/material';
import { TotalQtyOfItemInCart } from '../../../cross-page/cartPopOver/cart-product-quantity-bar';
import ItemDialog from '../../item/item-dialog/item-dialog';

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
  const [openItemModal, setOpenItemModal] = React.useState(false);
  const handleOpenItemModal = () => {
    setOpenItemModal(true);
  };
  const handleCloseItemModal = () => {
    setOpenItemModal(false);
  };
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
  console.log(props.blockWidth);
  return (
  // @ts-ignore
  //   <Card sx={{ maxWidth: Math.round(props.blockWidth) }}>
    <Card sx={{ maxWidth: Math.floor(props.blockWidth) }}>
      <StyledCardMedia component="img" height={Math.round(height) } image={productColor.url} onClick={() => handleOpenItemModal()} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" margin={0}>
          {product.title}
        </Typography>
        <Typography gutterBottom variant="caption" component="div">
          ${product.price} USD
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
          flexWrap: 'wrap'
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
      <ItemDialog
        openItemModal={openItemModal}
        handleOpenItemModal={handleOpenItemModal}
        handleCloseItemModal={handleCloseItemModal}
        product={product}
      />
    </Card>
  );
}

export default React.memo(ProductItem);
