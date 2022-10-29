import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { WrappingOptionImage } from '../cart-page.styles';

function OrderWrappingOptions() {
  return (
    <FormControl sx={{ p: '5px' }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Wrapping#1"
        name="radio-buttons-group"
        row
      >
        <FormControlLabel
          value="Wrapping#1"
          control={<Radio />}
          label={
            <WrappingOptionImage src="https://i.etsystatic.com/24160881/r/il/68a0e5/2409865784/il_fullxfull.2409865784_i51a.jpg" />
          }
        />
        <FormControlLabel
          value="Wrapping#2"
          control={<Radio />}
          label={<WrappingOptionImage src="https://i.pinimg.com/736x/76/e6/29/76e629e95e2e68e94bc9a9f5178fb4a7.jpg" />}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default OrderWrappingOptions;
