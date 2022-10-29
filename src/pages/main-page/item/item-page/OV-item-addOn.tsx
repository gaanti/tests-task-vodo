import React from 'react';
import { Paper, Stack, Switch, Typography } from '@mui/material';
import OrderOptionalPresent from '../../../cart/cart-item/order-optional-present';
import findindex from 'lodash.findindex';

function OvItemAddOn(props: {
  imageUrl: string;
  addOnTitle: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  chosenAddOns: any
}) {
  const {addOnTitle, chosenAddOns, imageUrl, handleChange} = props
  return (
    <Paper>
      <Stack alignItems={'center'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography>{addOnTitle} </Typography>
        </Stack>
        <OrderOptionalPresent imageUrl={imageUrl} />
        <Switch name={addOnTitle} checked={chosenAddOns[addOnTitle]} onChange={e => handleChange(e)}/>
      </Stack>
    </Paper>
  );
}

export default OvItemAddOn;