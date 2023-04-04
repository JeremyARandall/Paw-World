import React, { useEffect, useReducer, } from 'react';
import Product from '../Components/Product/Product';
import * as api from '../api';
import { useParams } from 'react-router-dom';
import {

  Grid,

} from '@mui/material';
import logger from 'use-reducer-logger';

//import { getProducts } from '../actions/product';
//import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
//import reducers from '../reducers/index';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProductPage = () => {
  const { id } = useParams(); //fetches the id URI segment
  console.log(`${id}`);

  //reducer function with the default state, empty product, loading, no error
  const [{ loading, error, product }, dispatch] =
    useReducer(logger(reducer), {
      product: [],
      loading: true,
      error: '',
    })
  //create function to dispatch actions per state for getting product by id, then calls that function. then returns a div based on the state, eventually with the product when it is fetched or an error if needed
  useEffect(() => {
    //  getProducts()
    const getProductById = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await api.fetchProductById(id);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    getProductById();
  }, [id]);
  return (
    loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <Grid container>
        <Product product={product} />
      </Grid>
    )
  );
};

export default ProductPage;
