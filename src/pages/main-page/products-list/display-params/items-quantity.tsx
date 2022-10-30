import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from '@mui/material';
import { product } from '../../../../app/slices/cart/types';

function ItemsQuantity(props: { originalProductsList: product[], itemsListQty: number, setItemsListQty: (qty: number) => void }) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setItemsListQty(event.target.value as unknown as number);
  };
  const columnOptions = () => {
    const initializedArr = Array(props.originalProductsList.length+1).fill(0);
    return initializedArr.map((_option, index) => {
      if (index>0) {
        return (
          <MenuItem key={index} value={index}>
            {index}
          </MenuItem>
        );
      }
    });
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">List size</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.itemsListQty as unknown as string}
        label="List size"
        onChange={handleChange}
      >
        {columnOptions()}
      </Select>
    </FormControl>
  );
}

export default React.memo(ItemsQuantity);