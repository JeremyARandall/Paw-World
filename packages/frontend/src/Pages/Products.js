import React, { useEffect, useReducer, } from 'react';
import Product from '../Components/Product/Product';
import * as api from '../api';
import { Grid, } from '@mui/material';
import './Pages.css';

import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ProductsPage = () => {

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })

  useEffect(() => {

    const getProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {

        const result = await api.fetchProducts();

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    }
    getProducts();
  }, []);
  return (
    <div className="productspage">
      {loading ? (
        <div class="loading"></div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Grid container className="productsGrid" >
          {products.map((product) => {  //takes each product from the array from getProducts and maps to Product components.
            return <Grid key={product._id} item>
              <Product product={product} />
            </Grid>;
          }
          )}
        </Grid>
      )}
    </div>
  );
};

export default ProductsPage;