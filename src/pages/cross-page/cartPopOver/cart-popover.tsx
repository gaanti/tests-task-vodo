import React from 'react';
import { createTheme, Menu, MenuItem, Paper, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { productForCart } from '../../../app/slices/cart/types';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom';
import CartPopoverItem from './cartItem/cart-popover-item';

export const lightTheme = createTheme({ palette: { mode: 'light' } });

function CartPopover(props: { cartItems: productForCart[] }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const callApproving = () => {};

  return (
    <ThemeProvider theme={lightTheme}>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} style={{ padding: '10px' }}>
        <Link to="cart" style={{ all: 'unset', cursor: 'pointer' }} onClick={() => setAnchorEl(null)}>
          <MenuItem sx={{ justifyContent: 'center' }}>
            <span>Go to cart</span>
            <KeyboardDoubleArrowRightIcon />
          </MenuItem>
        </Link>
        {props.cartItems.map((item) => {
          return <CartPopoverItem item={item} />;
        })}
      </Menu>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Paper
          sx={{
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span>Cart</span>
          <ShoppingCartIcon />
        </Paper>
      </Button>
    </ThemeProvider>
  );
}

export default CartPopover;
