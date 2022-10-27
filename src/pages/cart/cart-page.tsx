import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../../app/slices/cart/cartSlice';
import CartPopoverItem from '../cross-page/cartPopOver/cartItem/cart-popover-item';
import { Button, Container, Paper, Stack, TextField, TextFieldProps, ThemeProvider, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { darkTheme } from '../cross-page/navbar';

function CartPage() {
  const cartItems = useSelector(cartItemsSelector);
  const [value, setValue] = React.useState<null>(null);
  const totalPrice = cartItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.product.price * currentValue.quantity,
    0,
  );
  const [comment, setComment] = useState('');
  const setCommentAction = (e: string) => {
    const limit = 35;
    setComment(e.slice(0, limit));
  };
  console.log(darkTheme);

  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={2} alignItems={'center'}>
        {cartItems.map((item) => {
          return (
            <Paper>
              <CartPopoverItem item={item} />
            </Paper>
          );
        })}
      </Stack>
      <Stack spacing={1}>
        <TextField
          fullWidth
          id="standard-basic"
          label="Your's comment (optional)"
          variant="standard"
          size="small"
          value={comment}
          onChange={(e) => setCommentAction(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Prefered delivery date"
            value={value}
            onChange={(newValue: any) => {
              setValue(newValue);
            }}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Total price: ${totalPrice}</Typography>
            <Button variant={'contained'}>
              Checkout
            </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CartPage;