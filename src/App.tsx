import React from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route index element={<MainPage />} />
          <Route path='*' element={<div>ERROR PAGE NOT FOUND</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Wrapper() {
  return (
    <div className='app-wrapper'>
      <Outlet />
    </div>
  );
}

export default App;
