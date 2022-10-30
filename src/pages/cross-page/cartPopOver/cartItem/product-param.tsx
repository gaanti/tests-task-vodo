import React from 'react';
import { Typography } from '@mui/material';
import { ProductInCartParamWrapper } from './modal-cart-item.styles';

function ProductParam(props: { children: any }) {
  return (
    <ProductInCartParamWrapper>
      <Typography component="div" variant="subtitle2" width={'100%'}>
        {props.children}
      </Typography>
    </ProductInCartParamWrapper>
  );
}

export default ProductParam;
