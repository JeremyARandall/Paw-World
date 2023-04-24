import { React, useContext, } from 'react';
//import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
//import { useDispatch } from 'react-redux';

import { Routes, Route, BrowserRouter } from 'react-router-dom'


import ProductsPage from './Pages/Products';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Signup from './Pages/signup';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ProductPage from './Pages/ProductPage';
import { Store } from './Store';
import NavBar from './Components/NavBar/NavBar';
import Login from './Pages/login';
import Search from './Pages/Search';
//import useStyles from './styles';



function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    //create the router
    <BrowserRouter>
      <div className='App'>
        <NavBar /*App bar on top will be displayed on all page when put outside the router */ />
        <main>

          <Routes /*all routes within the router have a path(portion behind URL), and an element associated with it, which is the page pulled from Components */>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /* going to localhost:3000/signup will bring the signup page from ./Components/signup.js that was imported*/ />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin" element={<AdminPanel />} /*current method to add products to db during development*/ />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/' element={<ProductsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/search' element={<Search />} />

          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App;