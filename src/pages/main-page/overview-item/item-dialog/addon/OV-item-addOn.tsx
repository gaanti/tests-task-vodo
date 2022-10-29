import React from 'react';
import { Paper, Stack, Switch, Typography } from '@mui/material';
import styled from 'styled-components';

function OvItemAddOn(props: {
  imageUrl: string;
  addOnTitle: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
  chosenAddOns: any;
}) {
  const { addOnTitle, chosenAddOns, imageUrl, handleChange } = props;
  return (
    <Paper>
      <Stack alignItems={'center'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography>{addOnTitle} </Typography>
        </Stack>
        <OrderOptionalPresent imageUrl={imageUrl} />
        <Switch name={addOnTitle} checked={chosenAddOns[addOnTitle]} onChange={(e) => handleChange(e)} />
      </Stack>
    </Paper>
  );
}

function OrderOptionalPresent(props: { imageUrl: string }) {
  const OptionalPresent = styled.img`
    height: 100px;
    width: 90px;
  `;
  return (
    <div>
      <OptionalPresent src={props.imageUrl} />
    </div>
  );
}

export default OvItemAddOn;
