import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { product, productForCart } from '../../../app/slices/cart/types';
import data from '../../../mock-data/mock-data.json';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import ColorOptions from '../../cross-page/components/color-options/color-options';
import CartProductQuantityBar from '../../cross-page/cartPopOver/cart-product-quantity-bar';
import { useAppSelector } from '../../../app/store';
import { cartItemsSelector } from '../../../app/slices/cart/cartSlice';
import SizeOptions from '../../cross-page/components/size-options/size-options';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

function OverviewItem() {
  const { itemId } = useParams();
  const productsInstance: product[] = data;
  const NumberIdeaId = Number(itemId);
  const product = productsInstance.find((product) => product.id === NumberIdeaId);
  const [productColor, setProductColor] = useState(product && product.colors[0]);
  const [activeProductSizeOption, setActiveProductSizeOption] = useState(product ? product.sizes[0] : '');

  const itemsInCartList = useAppSelector(cartItemsSelector);
  const elementInCartIndex = itemsInCartList.findIndex((item) => item.product.id == product!.id);
  console.log(elementInCartIndex);
  const ItemInCart = itemsInCartList[elementInCartIndex];
  console.log(ItemInCart);

  const [quantity, setQuantity] = useState(1);
  if (itemId && !isNaN(NumberIdeaId) && product && productColor) {
    const productForCar: productForCart = {
      color: productColor.color,
      size: activeProductSizeOption,
      product: product,
      quantity: ItemInCart ? quantity : 0,
    };
    return (
      <Stack direction="row" justifyContent={'center'} spacing={4}>
        <Card sx={{ maxWidth: '400px' }}>
          {/*<OverviewItemImage src={product.image} />*/}
          <CardMedia component="img" height="600" image={product.colors[0].url} alt="Paella dish" />
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
                {<CartProductQuantityBar item={ItemInCart ? ItemInCart : productForCar} productColor={productColor} activeProductSizeOption={activeProductSizeOption}/>}
              </div>
            </Stack>
            </CardActions>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return <div>asd</div>;
}

export default OverviewItem;
