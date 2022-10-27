import React from 'react';
import { Box, createTheme, Menu, Paper, ThemeProvider, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PopOverCartItemDescription } from '../navbar.styles';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { productForCart } from '../../../app/slices/cart/types';
import CartProductQuantityBar from './cart-product-quantity-bar';

function CartPopover(props: { cartItems: productForCart[] }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const lightTheme = createTheme({ palette: { mode: 'light' } });
  const callApproving = () => {
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ padding: '10px' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.cartItems.map((item) => {
          return (
            <Card sx={{ display: 'flex', width: '600px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.product.title}
                  </Typography>
                  <PopOverCartItemDescription variant="subtitle1" color="text.secondary" component="div">
                    {item.product.description}
                  </PopOverCartItemDescription>
                </CardContent>
                <CartProductQuantityBar item={item} />
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item.product.image}
                alt="Live from space album cover"
              />
            </Card>
          );
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