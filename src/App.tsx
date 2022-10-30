import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import Navbar from './pages/cross-page/navbar';
import CartPage from './pages/cart/cart-page';
import { useSelector } from 'react-redux';
import { backgroundColorSelector } from './app/slices/cart/appParamsSlice';
import { AppWrapper } from './index.styles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<MainPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<div>ERROR PAGE NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Wrapper() {
  const backgroundColor = useSelector(backgroundColorSelector)
  return (
    <AppWrapper bgColor={backgroundColor}>
      <Navbar />
      <Outlet />
    </AppWrapper>
  );
}

export default App;
