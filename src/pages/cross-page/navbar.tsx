import React from 'react';
import {
  AppBar,
  createTheme, Fade,
  Paper, Popover,
  Popper,
  PopperPlacementType,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { initialStateSelector } from '../../app/slices/cart/cartSlice';

function Navbar() {
  const cartItems = useSelector(initialStateSelector)
  const darkTheme = createTheme({ palette: { mode: 'dark' } });
  const lightTheme = createTheme({ palette: { mode: 'light' } });

  function AppBarLabel(label: string) {

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
      <Toolbar>
        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
          Test-task navigation
        </Typography>
        <ThemeProvider theme={lightTheme}>
          <Popover
            id='mouse-over-popover'
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {cartItems.map(item => {
              return(
                <div>
                  {item.title}
                </div>
              )
            })}
          </Popover>
          <Paper sx={{
            padding: '5px', display: 'flex',
            alignItems: 'center', gap: '8px',
            cursor: 'pointer',
          }} onMouseEnter={handlePopoverOpen}
                 onMouseLeave={handlePopoverClose}><span>Cart</span><ShoppingCartIcon /></Paper>
        </ThemeProvider>
      </Toolbar>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='primary' position='static'>{AppBarLabel('default')}</AppBar>
    </ThemeProvider>
  );
}

export default Navbar;