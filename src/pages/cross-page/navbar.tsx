import React from 'react';
import { AppBar, Box, createTheme, IconButton, Menu, Paper, ThemeProvider, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { initialStateSelector } from '../../app/slices/cart/cartSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { PopOverCartItemDescription } from './navbar.styles';
import Button from '@mui/material/Button';
import './navbar.scss'
import CartPopover from './cartPopOver/cart-popover';

function Navbar() {
  const cartItems = useSelector(initialStateSelector);
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Test-task navigation
          </Typography>
          {cartItems.length > 0 && <CartPopover cartItems={cartItems} />}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
