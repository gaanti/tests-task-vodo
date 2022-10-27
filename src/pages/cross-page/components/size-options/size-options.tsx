import React from 'react';
import { product } from '../../../../app/slices/cart/types';
import { Stack } from '@mui/material';
import { OverviewItemSize } from '../../../main-page/item-page/overview-item.styles';

function SizeOptions(props: {
  product: product;
  activeProductSizeOption: string;
  setActiveProductSizeOption: (size: string) => void;
}) {
  const size = 1;
  return (
    <Stack direction="row" spacing={size}>
      {props.product.sizes.map((size) => {
        return (
          <OverviewItemSize
            size={30}
            key={size}
            className={props.activeProductSizeOption == size ? 'activeSize' : ''}
            onClick={() => props.setActiveProductSizeOption(size)}
          >
            {size}
          </OverviewItemSize>
        );
      })}
    </Stack>
  );
}

export default SizeOptions;
