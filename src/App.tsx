import React from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import Navbar from './pages/cross-page/navbar';
import OverviewItem from './pages/main-page/item-page/overview-item';
import CartPage from './pages/cart/cart-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<MainPage />} />
          <Route path="item/:itemId" element={<OverviewItem />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<div>ERROR PAGE NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Wrapper() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
