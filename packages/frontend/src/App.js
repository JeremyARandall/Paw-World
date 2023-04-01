import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

import { getProduct } from './actions/product';
import Products from './Components/Products/Products';
import Form from './Components/Form/Form';
import Signup from './components/signup';
import ResponsiveAppBar from './components/appbar';
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

const App = () => {
 // const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);



}

export default App;