import React, { useEffect, useState } from 'react';
import { product, productForCart } from '../../../../app/slices/cart/types';
import OvItem from './item/OV_item';
import { GetAddOnsControl } from '../../../hooks/getAddOnsControl';
import { useAppDispatch } from '../../../../app/store';
import { updateProductInCart } from '../../../../app/slices/cart/cartSlice';

function TRANSITIONAL__OVItem(props: {
  productExistingInCart?: productForCart;
  product: product;
  handleCloseItemModal(): void;
  mode?: 'configure' | 'overview';
}) {
  const { product, productExistingInCart } = props;
  const [activeProductColor, setActiveProductColor] = useState(
    productExistingInCart ? productExistingInCart.color : product.colors[0],
  );
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(
    productExistingInCart ? productExistingInCart.size : product.sizes[0],
  );
  const [chosenAddOns, handleAddOnChang] = GetAddOnsControl(
    productExistingInCart ? productExistingInCart.product : product,
    productExistingInCart?.chosenAddOns,
  );
  const dispatch = useAppDispatch();

  const handleAddOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleAddOnChang(event);
  };
  useEffect(() => {
    if (productExistingInCart) {
      const productToChange: productForCart = {
        chosenAddOns: chosenAddOns,
        color: activeProductColor,
        product: productExistingInCart.product,
        quantity: productExistingInCart.quantity,
        size: activeProductSizeOption,
      };
      dispatch(updateProductInCart(productToChange));
    }
  }, [chosenAddOns, activeProductSizeOption, activeProductColor]);

  console.log('Chosen addOns', chosenAddOns);
  if (productExistingInCart) {
    return (
      <OvItem
        mode={props.mode}
        activeProductColor={activeProductColor}
        setActiveProductColor={setActiveProductColor}
        activeProductSizeOption={activeProductSizeOption}
        setActiveProductSizeOption={setActiveProductSizeOption}
        productForCart={productExistingInCart}
        chosenAddOns={chosenAddOns}
        handleCloseItemModal={props.handleCloseItemModal}
        handleAddOnChange={handleAddOnChange}
      />
    );
  }
  const fakeCartItem: productForCart = {
    chosenAddOns: chosenAddOns,
    color: product.colors[0],
    product: product,
    quantity: 0,
    size: product.sizes[0],
  };

  return (
    <OvItem
      mode={props.mode}
      activeProductColor={activeProductColor}
      setActiveProductColor={setActiveProductColor}
      activeProductSizeOption={activeProductSizeOption}
      setActiveProductSizeOption={setActiveProductSizeOption}
      productForCart={fakeCartItem}
      chosenAddOns={fakeCartItem.chosenAddOns}
      handleCloseItemModal={props.handleCloseItemModal}
      handleAddOnChange={handleAddOnChange}
    />
  );
}

export default TRANSITIONAL__OVItem;
