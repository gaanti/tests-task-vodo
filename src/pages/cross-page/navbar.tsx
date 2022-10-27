import React from 'react';
import { AppBar, createTheme, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { cartItemsSelector } from '../../app/slices/cart/cartSlice';
import './navbar.scss';
import CartPopover from './cartPopOver/cart-popover';
import { Link } from 'react-router-dom';

export const darkTheme = createTheme({ palette: { mode: 'dark' } });

function Navbar() {
  const cartItems = useSelector(cartItemsSelector);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="primary" position="static">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Link to="/" style={{all:"unset", cursor: "pointer"}}>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Test-task navigation
            </Typography>
          </Link>
          {cartItems.length > 0 && <CartPopover cartItems={cartItems} />}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
