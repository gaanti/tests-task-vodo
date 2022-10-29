import React, { useCallback, useState } from 'react';
import { product } from '../../app/slices/cart/types';


export function GetAddOnsControl(currentProduct: product, existingAddOns?: any[]) {
  const possibleAddOns: any = {}
  const addOnsList = Object.keys(currentProduct.addOns) as string[]
  for (let i = 0; i < addOnsList.length; i++) {
    // @ts-ignore
    const addOnTitle = currentProduct.addOns[addOnsList[i]].title
    possibleAddOns[addOnTitle] = false
  }
  const [chosenAddOns, setChosenAddOns] = useState({
    ...possibleAddOns,
    ...existingAddOns,
  });
  const handleAddOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenAddOns({
      ...chosenAddOns,
      [event.target.name]: event.target.checked,
    })
  }
  return [chosenAddOns, handleAddOnChange]
}