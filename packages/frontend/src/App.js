import { React, } from 'react';
//import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
//import { useDispatch } from 'react-redux';

import { Routes, Route, BrowserRouter } from 'react-router-dom'


import ProductsPage from './Pages/Products';
import Form from './Components/Form/Form';
import Signup from './Pages/signup';
import ResponsiveAppBar from './Components/appbar';

import ProductPage from './Pages/ProductPage';
//import useStyles from './styles';



function App() {
  return (
    //create the router
    <BrowserRouter>
      <div className='App'>
        <ResponsiveAppBar /*App bar on top will be displayed on all page when put outside the router */ />
        <main>

          <Routes /*all routes within the router have a path(portion behind URL), and an element associated with it, which is the page pulled from Components */>
            <Route path="/signup" element={<Signup />} /* going to localhost:3000/signup will bring the signup page from ./Compenents/signup.js that was imported*/ />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/addproducttest" element={<Form />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </main>


      </div>
    </BrowserRouter>
  )
}

export default App;