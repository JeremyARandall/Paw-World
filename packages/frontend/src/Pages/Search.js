import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Product from '../Components/Product/Product';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload,

                loading: false
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

export default function Search() {
    const navigate = useNavigate()
    const { search } = useLocation();
    const queries = new URLSearchParams(search);
    const order = queries.get('order') || 'lowest';
    const query = queries.get('query') || '';

    const [{ loading, error, products, }, dispatch] = useReducer(reducer, { loading: true, error: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/search?query=${query}&order=${order}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: err.message
                })
            }
        };
        fetchData();
    }, [error, order, query])

    const getFilterURL = (filter) => {
        const filterQuery = filter.query || query;
        const sortOrder = filter.order || order;
        return `/search?query=${filterQuery}&order=${sortOrder}`;
    }

    return (
        <div className='searchPage'>
            {loading ? (
                <div class="loading"></div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <Grid container className='searchWrapper'>
                    <Typography>Sort By: </Typography>
                    <select value={order} onChange={(e) => { navigate(getFilterURL({ order: e.target.value })) }}>
                        <option value="lowest">Price: Lowest to Highest</option>
                        <option value="highest">Price: Highest to Lowest</option>
                        <option value="fewest">Stock Remaining: Lowest to Highest</option>
                        <option value="most">Stock Remaining: Highest to Lowest</option>
                    </select>

                    <Grid container className='searchGrid'>
                        {products.map((product) => {  //takes each product from the array from getProducts and maps to Product components.
                            return <Grid key={product._id} item>
                                <Product product={product} />
                            </Grid>;
                        })}
                    </Grid>
                </Grid>
            )}
        </div>
    )
}