import React from 'react';
import { darkTheme } from '../../navbar';
import { Paper, ThemeProvider } from '@mui/material';
import { product } from '../../../../app/slices/cart/types';
import './color-options.scss';
import { ColorCircle } from './color-options.styles';

function ColorOptions(props: {
  product: product;
  productColor: string;
  setProductColor: (color: string) => void;
  size?: number;
}) {
  if (props.product.colors.length > 0) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Paper sx={{ display: 'flex', gap: '6px', p: '7px', backgroundColor: '#c4c4c4' }}>
          {props.product.colors.map((color) => {
            return (
              <ColorCircle
                color={color}
                className={`${color == props.productColor ? 'active' : ''}`}
                key={color}
                onClick={() => {
                  props.setProductColor(color);
                }}
              />
            );
          })}
        </Paper>
      </ThemeProvider>
    );
  }
  return <></>;
}

export default ColorOptions;
