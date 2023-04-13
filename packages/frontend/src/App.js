import { React, useContext, } from 'react';
//import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
//import { useDispatch } from 'react-redux';

import { Routes, Route, BrowserRouter } from 'react-router-dom'


import ProductsPage from './Pages/Products';
import Form from './Components/Form/Form';
import Signup from './Pages/signup';
import ResponsiveAppBar from './Components/appbar';
import Cart from './Pages/Cart';

import ProductPage from './Pages/ProductPage';
import { Store } from './Store';
import Navbar from './navbar';
//import useStyles from './styles';



function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    //create the router
    <BrowserRouter>
      <div className='App'>
        <Navbar /*App bar on top will be displayed on all page when put outside the router */ />
        <main>

          <Routes /*all routes within the router have a path(portion behind URL), and an element associated with it, which is the page pulled from Components */>
            <Route path="/signup" element={<Signup />} /* going to localhost:3000/signup will bring the signup page from ./Components/signup.js that was imported*/ />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/addproducttest" element={<Form />} /*current method to add products to db during development*/ />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>


      </div>
    </BrowserRouter>
  )
}

export default App;