import React, { useEffect, useReducer, } from 'react';
import Product from '../Components/Product/Product';
import * as api from '../api';
import { Grid, Box, } from '@mui/material';

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
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Grid container sx={{ display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', alignItems: "left", backgroundColor: '#B3CAEB', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
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
