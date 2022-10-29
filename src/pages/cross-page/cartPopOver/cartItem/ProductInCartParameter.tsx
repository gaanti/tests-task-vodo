import React from 'react';
import { Paper, Typography } from '@mui/material';
import { ProductInCartParamWrapper } from './cart-popover-item.styles';

function ProductInCartParameter(props:{field: any}) {
  return (
    <ProductInCartParamWrapper>
      <Typography component='div' variant='subtitle2'>
        {props.field}
      </Typography>
    </ProductInCartParamWrapper>
  );
}

export default ProductInCartParameter;