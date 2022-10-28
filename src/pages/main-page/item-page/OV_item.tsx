import React from 'react';
import { colors, productForCart } from '../../../app/slices/cart/types';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import SizeOptions from '../../cross-page/components/size-options/size-options';
import ColorOptions from '../../cross-page/components/color-options/color-options';
import CartProductQuantityBar from '../../cross-page/cartPopOver/cart-product-quantity-bar';

function OvItem(props: {
  productForCart: productForCart;
  productColor: colors;
  setProductColor: React.Dispatch<React.SetStateAction<colors | undefined>>;
  activeProductSizeOption: string;
  setActiveProductSizeOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { productForCart, productColor, setProductColor, activeProductSizeOption, setActiveProductSizeOption } = props;
  const { product } = productForCart;
  return (
    <Stack direction="row" justifyContent={'center'} spacing={4}>
      <Card sx={{ maxWidth: '400px' }}>
        {/*<OverviewItemImage src={product.image} />*/}
        <CardMedia component="img" height="600" image={productColor.url} alt="Paella dish" />
        <Stack spacing={2}>
          <CardContent>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="subtitle1">${product.price} USD</Typography>
            <Typography variant="subtitle2">${product.description} USD</Typography>
          </CardContent>
          <CardActions>
            <Stack spacing={2} direction={'row'}>
              <div>
                <Typography variant="h6">Size</Typography>
                <SizeOptions
                  product={product}
                  activeProductSizeOption={activeProductSizeOption}
                  setActiveProductSizeOption={setActiveProductSizeOption}
                />
              </div>
              {
                //checking for exis
                product.colors.length > 0 && productColor && (
                  <div>
                    <Typography variant="h6">Color</Typography>
                    <ColorOptions
                      size={25}
                      product={product}
                      setProductColor={setProductColor}
                      productColor={productColor}
                    />
                  </div>
                )
              }
              <div>
                <Typography variant="h5">Quantity</Typography>
                {
                  <CartProductQuantityBar
                    productColor={productColor}
                    item={props.productForCart}
                    activeProductSizeOption={activeProductSizeOption}
                  />
                }
              </div>
            </Stack>
          </CardActions>
        </Stack>
      </Card>
    </Stack>
  );
}

export default OvItem;