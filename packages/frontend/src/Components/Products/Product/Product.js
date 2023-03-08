import React from "react";
import { useSelector } from 'react-redux';
import useStyles from './styles' //import the styles from styles.js in local folder
  
const Product = () => { //Creates the Product display on the frontend
    const classes = useStyles();
    const product = useSelector((state) => state.product);

    console.log(product);

    return (
        <h1>Product</h1> //returns a header containing 'Product'
    );
}

export default Product;