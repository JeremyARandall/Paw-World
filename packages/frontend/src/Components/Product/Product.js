import React from 'react';

//import useStyles from './styles' //import the styles from styles.js in local folder
//import { styled } from '@mui/material/styles'; //import for using styles
import { Button, Card, CardContent, CardMedia, Typography, Box, } from '@mui/material';
import { Link } from 'react-router-dom';



const Product = (props) => {
  //Creates the Product display on the frontend
  // const classes = useStyles();
  const { product } = props;
  return (
    <Card className="product" sx={{ marginTop: '1rem', marginBottom: '1rem'}}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", backgroundColor: '#EBF3FF', padding: '1rem', borderRadius: '0.5rem' }}>
      <Link to={`/products/${product._id}`}>
        <CardMedia component="img" image={product.productImage} alt={product.name} height="200"/>
      </Link>
      <CardContent className="product-info" sx={{ display: "flex", flexDirection: "column", alignItems: "left", padding: '20px'}}>
        <Link to={`/products/${product._id}`} >
          <Typography className='productName'>{product.name} </Typography>
        </Link>
        <Typography className='pricing'>
          ${product.price}
        </Typography>

      </CardContent>
      </Box>
    </Card>
  );
};

export default Product;
