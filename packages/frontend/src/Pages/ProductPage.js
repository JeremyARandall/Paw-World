import React, { useContext, useEffect, useReducer } from 'react';
import Product from '../Components/Product/Product';
import * as api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import './Pages.css';
import {

  Button,
  Grid,
  Box,

} from '@mui/material';
import logger from 'use-reducer-logger'; //logs State in console for devtools
import { Store } from '../Store';


//import { getProducts } from '../actions/product';
//import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
//import reducers from '../reducers/index';

//create the reducer for the productPage. changes the state based on input state and returns action if given
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }; //request action maintains previous state with loading being set to true
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }; //the payload for the action will be added to product object and loading state set to false
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }; //payload is error data, loading is set to false
    default:
      return state;
  }
}

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //fetches the id URI segment
  console.log(`${id}`); //for debugging api requests

  //reducer function with the default state of empty product, loading, no error
  const [{ loading, error, product }, dispatch] =
    useReducer(logger(reducer), {
      product: {},
      loading: true,
      error: '',
    })
  //create function to dispatch actions per state for getting product by id, then calls that function. then returns a div based on the state, eventually with the product when it is fetched or an error if needed
  useEffect(() => {
    const getProductById = async () => {
      dispatch({ type: 'FETCH_REQUEST' }); //data request action calls api for product with id
      try {
        const result = await api.fetchProductById(id);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data }); //dispatches the action for FETCH_SUCCESS  and returns the data from api call to new state
      } catch (err) { //in case of error, runs action for failure with the payload of the error message being sent to error
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    getProductById();
  }, [id]);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await api.fetchProductById(id);
    if (data.stockRemaining < quantity) {
      window.alert('Sorry, the product is out of stock');
      return;
    }
    ctxDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
    navigate('/cart');
  }
  return ( //if loading is true, display "Loading", display error if error encountered (404, 500, etc), otherwise created a <Grid> embedding a <Product>
    loading ? (
      <div className="loading"></div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <div className="ProductPageDiv" >
        <Grid container className="productPageGrid">
          <Box className="productPageBox">
            <Product product={product} />
            <Button onClick={addToCartHandler} className="addToCartButton" >Add to Cart</Button>
          </Box>
          <Box className="descriptionProdPage">
            <div className='description'>{product.description}</div>
          </Box>
        </Grid>
      </div>
    )
  );
};

export default ProductPage;
