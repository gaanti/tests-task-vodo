import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { product, productForCart } from '../../../app/slices/cart/types';
import data from '../../../mock-data/mock-data.json';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ColorOptions from '../../cross-page/components/color-options/color-options';
import CartProductQuantityBar from '../../cross-page/cartPopOver/cart-product-quantity-bar';
import { useAppSelector } from '../../../app/store';
import { cartItemsSelector } from '../../../app/slices/cart/cartSlice';
import SizeOptions from '../../cross-page/components/size-options/size-options';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import OvItem from './OV_item';

function OverviewItem() {
  const { itemId } = useParams();
  const productsInstance: product[] = data;
  const NumberIdeaId = Number(itemId);
  const product = productsInstance.find((product) => product.id === NumberIdeaId);
  const [productColor, setProductColor] = useState(product && product.colors[0]);
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(product ? product.sizes[0] : '');

  const itemsInCartList = useAppSelector(cartItemsSelector);
  const elementInCartIndex = itemsInCartList.findIndex((item) => item.product.id == product!.id);
  const ItemInCart = itemsInCartList[elementInCartIndex];

  const [quantity, setQuantity] = useState(1);
  if (itemId && !isNaN(NumberIdeaId) && product && productColor) {
    const productForCar: productForCart = {
      color: productColor,
      size: activeProductSizeOption,
      product: product,
      quantity: ItemInCart ? quantity : 0,
    };
    return (
        <OvItem productColor={productColor} setProductColor={setProductColor} activeProductSizeOption={activeProductSizeOption} setActiveProductSizeOption={setActiveProductSizeOption} productForCart={productForCar}/>
    );
  }
  return <div>asd</div>;
}

export default OverviewItem;
