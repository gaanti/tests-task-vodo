import React from 'react';
import { darkTheme } from '../../navbar';
import { Paper, ThemeProvider } from '@mui/material';
import { colors, product } from '../../../../app/slices/cart/types';
import './color-options.scss';
import { ColorCircle, ColorOptionsWrapper } from './color-options.styles';

function ColorOptions(props: {
  product: product;
  productColor: colors;
  setProductColor: (color: colors) => void;
  size?: number;
}) {
  if (props.product.colors.length > 0) {
    return (
      <ThemeProvider theme={darkTheme}>
        <ColorOptionsWrapper>
          {props.product.colors.map((colors) => {
            const { color } = colors;
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
        </ColorOptionsWrapper>
      </ThemeProvider>
    );
  }
  return <></>;
}

export default ColorOptions;
