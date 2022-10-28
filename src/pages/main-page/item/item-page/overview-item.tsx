import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { product, productForCart } from '../../../../app/slices/cart/types';
import data from '../../../../mock-data/mock-data.json';
import { useAppSelector } from '../../../../app/store';
import { cartItemsSelector } from '../../../../app/slices/cart/cartSlice';
import OvItem from './OV_item';

function OverviewItem(props:{id?:number}) {
  const { itemId } = useParams();
  const productsInstance: product[] = data;
  const NumberIdeaId = Number(itemId ? itemId : props.id);
  const product = productsInstance.find((product) => product.id === NumberIdeaId);
  const [productColor, setProductColor] = useState(product && product.colors[0]);
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(product ? product.sizes[0] : '');

  const itemsInCartList = useAppSelector(cartItemsSelector);
  const elementInCartIndex = itemsInCartList.findIndex((item) => item.product.id == product!.id);
  const ItemInCart = itemsInCartList[elementInCartIndex];

  if ((itemId || props.id) && !isNaN(NumberIdeaId) && product && productColor) {
    const productForCar: productForCart = {
      size: activeProductSizeOption,
      color: productColor,
      product: product,
      quantity: 0,
    };
    return (
      <OvItem
        productColor={productColor}
        setProductColor={setProductColor}
        activeProductSizeOption={activeProductSizeOption}
        setActiveProductSizeOption={setActiveProductSizeOption}
        productForCart={productForCar}
      />
    );
  }
  return <div>asd</div>;
}

export default OverviewItem;
