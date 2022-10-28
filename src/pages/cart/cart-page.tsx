import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../../app/slices/cart/cartSlice';
import CartPopoverItem from '../cross-page/cartPopOver/cartItem/cart-popover-item';
import {
  Button,
  Container, Divider,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  Stack,
  Switch,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OrderWrapping from './cart-item/order-wrapping';
import OrderOptionalPresent from './cart-item/order-optional-present';

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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [configurePopperOpen, setConfigurePopperOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setConfigurePopperOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={2} alignItems={'center'} >
        {cartItems.map((item) => {
          return (
            <Paper>
              <CartPopoverItem item={item}>
                <Button onClick={handleClick('bottom')}>Configure order</Button>
                <Popper
                  sx={{ zIndex: '1111111111' }}
                  open={configurePopperOpen}
                  anchorEl={anchorEl}
                  placement={placement}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Stack direction={'row'} width={'min-content'}>
                          <Stack>
                            <Typography>Choose the wrapper</Typography>
                            <OrderWrapping />
                          </Stack>
                          <Divider orientation="vertical" flexItem />
                          <Stack alignItems={'flex-end'}>
                            <Stack direction={'row'} alignItems={'center'}>
                              <Typography>I'd like to get a present</Typography>
                            </Stack>
                            <OrderOptionalPresent />
                              <Switch />
                          </Stack>
                        </Stack>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </CartPopoverItem>
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
          <Button variant={'contained'}>Checkout</Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default CartPage;
