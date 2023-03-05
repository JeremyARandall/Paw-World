import React from "react";
import useStyles from './styles'
  
const Product = () => { //Creates the Product display on the frontend
    const classes = useStyles();
    return (
        <h1>Product</h1> //returns a header containing 'Product'
    );
}

export default Product;