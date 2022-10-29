import React from 'react';
import { Typography } from '@mui/material';
import { ProductInCartParamWrapper } from './modal-cart-item.styles';

function ProductParam(props: { field: any }) {
  return (
    <ProductInCartParamWrapper>
      <Typography component="div" variant="subtitle2">
        {props.field}
      </Typography>
    </ProductInCartParamWrapper>
  );
}

export default ProductParam;
