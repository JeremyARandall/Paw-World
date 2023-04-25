import React from 'react';

//import useStyles from './styles' //import the styles from styles.js in local folder
//import { styled } from '@mui/material/styles'; //import for using styles
import { Card, CardContent, CardMedia, Typography, Box, } from '@mui/material';
import { Link } from 'react-router-dom';
import './Product.css';


const Product = (props) => {
  //Creates the Product display on the frontend
  // const classes = useStyles();
  const { product } = props;
  return (
    <Card className="productCard">
      <Box className="productBox">
        <Link to={`/products/${product._id}`} >
          <CardMedia className="productImage" component="img" image={product.productImage} alt={product.name} />
        </Link>
        <CardContent className="productCardContent">
          <Box className="brandWrapper">
            <Typography className='brand'>{product.brand}</Typography>
          </Box>
          <Link to={`/products/${product._id}`} className="productLink">
            <Typography className='productName'>{product.name} </Typography>
          </Link>
          <Box className="pricingWrapper">
            <Typography className='pricing'>${product.price}</Typography>
            <Typography className="leftInStock">Left in stock: {product.stockRemaining}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Product;
