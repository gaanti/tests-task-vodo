import React, { useEffect, useRef, useState } from 'react';
import data from '../../../mock-data/mock-data.json';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import SettingsIcon from '@mui/icons-material/Settings';

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

  const res = adaptColumnsQty();
  const res2 = res.maxColumnsQty;
  const res3 = Number(JSON.stringify(JSON.parse(String(res2))));
  const [columnsQty, setColumnsQty] = useState(res3);
  useEffect(() => {
    setColumnsQty(Number(res3));
  }, []);
  const [change, setChange] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('Available products');
  const triggerChange = () => {
    setChange((prevState) => !prevState);
  };
  const handleChange = (event: any, func: (arg: any) => void) => {
    // @ts-ignore
    func(event.target.value);
    triggerChange();
  };

  useEffect(() => {
  }, [spacing, blockWidth, columnsQty, change]);
  const [color, setColor] = React.useState('#000');

  const handleColorChange = (color: string) => {
    setColor(color);
  };
  const columnOptions = () => {
    const initializedArr = Array(adaptColumnsQty().maxColumnsQty).fill(0);
    return initializedArr.map((_option, index) => {
      if (index > 1) {
        return <MenuItem value={index + 1}>{index + 1} cols</MenuItem>;
      }
    });
  };
  console.log(columnsQty);

  return (
    <Stack spacing={2}>
      <Stack direction={'column'} alignItems={'center'}>
        <Typography padding={1} align={'center'} variant="h2" color={color}>
          {sectionTitle}
        </Typography>
      </Stack>

      <Masonry columns={columnsQty} spacing={spacing} sx={{ marginLeft: '0', alignContent: 'center' }} ref={ref}>
        <Accordion>
          <AccordionSummary expandIcon={<SettingsIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Configure appearance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ConfigureProductsDisplayStylesContainer>
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
                {window.screen.width / Number(columnsQty) - 30 > 270 && (
                  <Stack direction={'column'}>
                    <Typography variant="caption">Products width</Typography>
                    {/*If I turn off this slider the problem disapears*/}
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
                      max={window.screen.width / Number(columnsQty) -30}
                    />
                  </Stack>
                )}
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
                        setFixedBlockHeightBool(true);
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
          </AccordionDetails>
        </Accordion>
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
    </Stack>
  );
}

function adaptColumnsQty() {
  const deviceWidth = window.screen.width;
  if (deviceWidth <= 450) {
    const adaptedColumns: adaptedColumns = {
      maxColumnWidth: 190,
      maxColumnsQty: 2,
    };
    return adaptedColumns;
  }
  if (deviceWidth <= 770) {
    const adaptedColumns: adaptedColumns = {
      maxColumnWidth: 240,
      maxColumnsQty: 3,
    };
    return adaptedColumns;
  }
  if (deviceWidth <= 1000) {
    const adaptedColumns: adaptedColumns = {
      maxColumnsQty: 4,
      maxColumnWidth: 250,
    };
    return adaptedColumns;
  }
  if (deviceWidth > 1000) {
    const adaptedColumns: adaptedColumns = {
      maxColumnsQty: 5,
      maxColumnWidth: deviceWidth / 4 - 20,
    };
    return adaptedColumns;
  }
  const adaptedColumns: adaptedColumns = {
    maxColumnsQty: 3,
    maxColumnWidth: deviceWidth / 3 - 40,
  };
  return adaptedColumns;
}

interface adaptedColumns {
  maxColumnsQty: number;
  maxColumnWidth: number;
}

export default ProductsList;
