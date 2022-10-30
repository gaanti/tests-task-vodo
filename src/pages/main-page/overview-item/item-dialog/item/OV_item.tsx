import React from 'react';
import { colors, productForCart } from '../../../../../app/slices/cart/types';
import { Accordion, AccordionDetails, AccordionSummary, Paper, Stack } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import SizeOptions from '../../../../cross-page/components/size-options/size-options';
import ColorOptions from '../../../../cross-page/components/color-options/color-options';
import ProductQtyBar from '../../../../cross-page/cartPopOver/product-qty-bar';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OvItemAddOn from '../addon/OV-item-addOn';
import { CloseItem, OV_itemCard, OverviewItemColor } from './OV_item.styles';

function OvItem(props: {
  mode?: 'configure' | 'overview';
  productForCart: productForCart;
  setActiveProductColor: React.Dispatch<React.SetStateAction<colors>>;
  activeProductSizeOption: string;
  setActiveProductSizeOption: React.Dispatch<React.SetStateAction<string>>;
  handleCloseItemModal(): void;
  chosenAddOns: any;
  activeProductColor: colors;
  handleAddOnChange(event: React.ChangeEvent<HTMLInputElement>): void;
}) {
  const {
    setActiveProductColor,
    activeProductSizeOption,
    setActiveProductSizeOption,
    chosenAddOns,
    handleAddOnChange,
    activeProductColor,
  } = props;
  const { product } = props.productForCart;
  const productForCart: productForCart = {
    product: product,
    size: activeProductSizeOption,
    color: activeProductColor,
    chosenAddOns: chosenAddOns,
    quantity: props.productForCart.quantity,
  };
  const imageHeight =
    props.mode == 'overview' || !props.mode ? window.screen.height : window.screen.height - window.screen.height / 2.5;
  return (
    <Stack
      width={'70vw'}
      maxWidth={380}
      margin={'auto'}
      direction="row"
      justifyContent={'center'}
      spacing={4}
      overflow={'scroll'}
    >
      <OV_itemCard width={imageHeight * 1.5}>
        <CardMedia
          component="img"
          height={imageHeight}
          image={productForCart.color.url}
          alt="Paella dish"
          sx={{ maxHeight: '500px' }}
        />
        <OverviewItemColor>
          <ColorOptions
            size={25}
            product={product}
            setProductColor={setActiveProductColor}
            productColor={activeProductColor}
          />
        </OverviewItemColor>
        <CloseItem onClick={() => props.handleCloseItemModal()}>
          <Paper sx={{ display: 'flex', gap: '6px', p: '7px', backgroundColor: '#c4c4c4' }}>
            <CloseIcon />
          </Paper>
        </CloseItem>
        <Stack spacing={2}>
          <CardContent>
            <Typography variant="h5">{product.title}</Typography>
            <Typography variant="subtitle1">${product.price} USD</Typography>
            {props.mode == 'overview' ||
              (!props.mode && <Typography variant="subtitle2">{product.description}</Typography>)}
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', flexDirection: 'column' }}>
            <Stack direction={'row'} justifyContent={'space-between'} width={'100%'}>
              <div>
                <Typography variant="h6">Size</Typography>
                <SizeOptions
                  product={product}
                  activeProductSizeOption={activeProductSizeOption}
                  setActiveProductSizeOption={setActiveProductSizeOption}
                />
              </div>
              <Stack direction={'column'} alignItems={'center'}>
                <Typography variant="h6">Quantity</Typography>
                <ProductQtyBar item={productForCart} activeProductSizeOption={activeProductSizeOption} totalItemTypeQty/>
              </Stack>
            </Stack>
            <Accordion sx={{ width: '100%' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Add-ons (up tp 2)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack alignItems={'flex-start'} direction={'row'} spacing={1} overflow={'scroll'}>
                  {product.addOns.map((addOn) => {
                    return (
                      <OvItemAddOn
                        addOnTitle={addOn.title}
                        imageUrl={addOn.imageUrl}
                        chosenAddOns={chosenAddOns}
                        handleChange={handleAddOnChange}
                      />
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </CardActions>
        </Stack>
      </OV_itemCard>
    </Stack>
  );
}

export default OvItem;
