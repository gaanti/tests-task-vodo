import React, { useEffect, useRef, useState } from 'react';
import data from '../../../mock-data/mock-data.json';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import Masonry from '@mui/lab/Masonry';
import { product } from '../../../app/slices/cart/types';
import { useAppSelector } from '../../../app/store';
import { cartItemsSelector } from '../../../app/slices/cart/cartSlice';
import ProductItem from './product-item/product-item';
import { ConfigureProductsDisplayStylesContainer } from './configureProductsDisplayStyle.styles';
import { MuiColorInput } from 'mui-color-input';
import { adaptColumnsQty } from './adaptDataToDevice';

function ProductsList() {
  const productsInstance: product[] = data;
  const itemsInCartList = useAppSelector(cartItemsSelector);
  const ref = useRef(null);
  // @ts-ignore
  const masonryElemWidth = ref.current ? ref.current.offsetWidth : 0;
  const [spacing, setSpacing] = useState(2);
  const [blockHeight, setBlockHeight] = useState(350);
  const [fixedBlockHeightBool, setFixedBlockHeightBool] = useState(false);
  const [blockWidth, setBlockWidth] = useState(adaptColumnsQty().maxColumnWidth);
  const maxColumnsQty = adaptColumnsQty().maxColumnsQty;
  const [columnsQty, setColumnsQty] = useState(2);
  const [change, setChange] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('Available products');
  const adaptedColumns = adaptColumnsQty();
  const triggerChange = () => {
    setChange((prevState) => !prevState);
  };
  const gap = spacing * 8 * 2;
  const setCorrectWidth = () => {
    // setBlockWidth(masonryElemWidth / columnsQty - gap);
  };
  const handleChange = (event: any, func: (arg: any) => void) => {
    // @ts-ignore
    func(event.target.value);
    triggerChange();
  };

  useEffect(() => {
    // setCorrectWidth();
  }, [spacing, blockWidth, columnsQty, change]);
  const [color, setColor] = React.useState('#000');

  const handleColorChange = (color: string) => {
    setColor(color);
  };
  const columnOptions = () => {
    const initializedArr = Array(adaptColumnsQty().maxColumnsQty).fill(0);
    return initializedArr.map((_option, index) => {
      if (index > 1) {
        return <MenuItem value={index}>{index} cols</MenuItem>;
      }
    });
  };

  useEffect(() => {
    console.log(window.screen.width / columnsQty);
    console.log(123123123123);
  }, []);

  return (
    <Box>
      <Typography padding={1} align={'center'} variant="h2" color={color}>
        {sectionTitle}
      </Typography>
      <Masonry columns={columnsQty} spacing={spacing} sx={{ marginLeft: '0', alignContent: 'center' }} ref={ref}>
        <ConfigureProductsDisplayStylesContainer>
          <Typography variant="h6">Configure appearance</Typography>
          <Stack gap={2} overflow={'scroll'}>
            <Stack direction={'row'}>
              <Stack direction={'column'}>
                <Typography variant="caption">Section title</Typography>
                <TextField value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
              </Stack>
              <Stack direction={'column'}>
                <Typography variant="caption">Section font color</Typography>
                <MuiColorInput value={color} onChange={handleColorChange} />
              </Stack>
            </Stack>
            <Stack direction={'column'}>
              <Typography variant="caption">Products gap</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={8}
                value={spacing}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setSpacing(e!.target!.value!);
                  triggerChange();
                }}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={4}
              />
            </Stack>
            <Stack direction={'column'}>
              <Typography variant="caption">Products width</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={8}
                value={blockWidth}
                // @ts-ignore
                onChange={(e) => {
                  // @ts-ignore
                  setBlockWidth(e!.target!.value!);
                  triggerChange();
                }}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={270}
                max={window.screen.width / columnsQty - 30}
              />
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'column'} width={'68%'}>
                <Typography variant="caption">Products height</Typography>
                <Slider
                  aria-label="Temperature"
                  defaultValue={260}
                  value={blockHeight}
                  // @ts-ignore
                  onChange={(e) => {
                    // @ts-ignore
                    setBlockHeight(e!.target!.value!);
                    triggerChange();
                  }}
                  valueLabelDisplay="auto"
                  step={20}
                  marks
                  min={270}
                  max={400}
                />
              </Stack>
              <Stack direction={'column'} width={'min-content'}>
                <FormControlLabel
                  label="Static height"
                  control={
                    <Checkbox
                      checked={fixedBlockHeightBool}
                      onChange={() => {
                        setFixedBlockHeightBool((prevState) => !prevState);
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Columns</InputLabel>
              <Select
                defaultValue={columnsQty}
                value={columnsQty}
                label="Product width"
                onChange={(e) => handleChange(e, setColumnsQty)}
              >
                {columnOptions()}
              </Select>
            </FormControl>
          </Stack>
        </ConfigureProductsDisplayStylesContainer>
        {productsInstance.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              itemsInCartList={itemsInCartList}
              blockWidth={blockWidth}
              blockHeight={blockHeight}
              fixedBlockHeightBool={fixedBlockHeightBool}
            />
          );
        })}
      </Masonry>
    </Box>
  );
}

export default ProductsList;
