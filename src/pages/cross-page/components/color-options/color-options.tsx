import React from 'react';
import { darkTheme } from '../../navbar';
import { Paper, ThemeProvider } from '@mui/material';
import { colors, product } from '../../../../app/slices/cart/types';
import './color-options.scss';
import { ColorCircle } from './color-options.styles';

function ColorOptions(props: {
  product: product;
  productColor: colors
  setProductColor: (color: colors) => void;
  size?: number;
}) {
  if (props.product.colors.length > 0) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Paper sx={{ display: 'flex', gap: '6px', p: '7px', backgroundColor: '#c4c4c4' }}>
          {props.product.colors.map((colors) => {
            const {color} = colors
            return (
              <ColorCircle
                color={color}
                className={`${color == props.productColor.color ? 'active-color' : ''}`}
                key={color}
                onClick={() => {
                  props.setProductColor(colors);
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
