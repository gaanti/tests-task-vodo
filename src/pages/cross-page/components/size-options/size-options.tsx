import React from 'react';
import { product } from '../../../../app/slices/cart/types';
import { OverviewItemSize, SizeOptionsContainer } from './size-options.styles';

function SizeOptions(props: {
  product: product;
  activeProductSizeOption: string;
  setActiveProductSizeOption: (size: string) => void;
}) {
  return (
    <SizeOptionsContainer rowGap={1}>
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
    </SizeOptionsContainer>
  );
}

export default SizeOptions;
