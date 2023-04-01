import { React,  useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Routes, Route, BrowserRouter, Switch } from 'react-router-dom'

import { getProduct } from './actions/product';
import Products from './Components/Products/Products';
import Form from './Components/Form/Form';
import Signup from './Components/signup';
import ResponsiveAppBar from './Components/appbar';
//import useStyles from './styles';

const PREFIX = 'App';
const classes = {
  appBar: `${PREFIX}-appBar`,
  heading: `${PREFIX}-heading`,
  image: `${PREFIX}-image`,
}
const Root = styled(`div`)(({ theme }) => ({
  [`&.${classes.root}`]: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`&.${classes.heading}`]: {
    color: 'rgba(0,183,255, 1)',
  },
  [`&.${classes.image}`]: {
    marginLeft: '15px',
  },
}))

/*const App = () => {
 // const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);



}*/
function App() {
  return (
    //create the router
    <BrowserRouter>
    <div className='App'>
      <ResponsiveAppBar /*App bar on top will be displayed on all page when put outside the router *//>
      <main>
        
        <Routes /*all routes within the router have a path(portion behind URL), and an element associated with it, which is the page pulled from Components */>
          <Route path="/signup" element={<Signup/>} /* going to localhost:3000/signup will bring the signup page from ./Compenents/signup.js that was imported*//>
          <Route path="/products" element={<Products />}/>
        </Routes>
      </main>

      
    </div>
    </BrowserRouter>
  )
}

export default App;