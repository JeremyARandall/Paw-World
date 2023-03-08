import React from "react";
import Product from './Product/Product';
import useStyles from './styles'
  
const Products = () => {
    const classes = useStyles();
    return (
        <>
            <h1>Products</h1>
            <Product />
            <Product />
        </>
    );
}

export default Products;