import React from 'react';

//import useStyles from './styles' //import the styles from styles.js in local folder
//import { styled } from '@mui/material/styles'; //import for using styles
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



const Product = (props) => {
  //Creates the Product display on the frontend
  // const classes = useStyles();
  const { product } = props;
  return (
    <Card className="product">
      <Link to={`/product/${product.id}`}>
        <CardMedia image={product.image} alt={product.name} />
      </Link>
      <CardContent className="product-info">
        <Link to={`/product/${product.id}`}>
          <Typography className='productName'>{product.name}</Typography>
        </Link>
        <Typography className='pricing'>
          ${product.price}
        </Typography>
        <button>Add to cart</button>
      </CardContent>
    </Card>
  );
};

export default Product;
