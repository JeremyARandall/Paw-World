import React from "react";
import { useSelector } from 'react-redux';
//import useStyles from './styles' //import the styles from styles.js in local folder
import { styled } from '@mui/material/styles'; //import for using styles

const PREFIX = 'Product';
const classes = {
    media: `${PREFIX}-media`,
    border: `${PREFIX}-border`,
    fullHeightCard: `${PREFIX}-fullHeightCard`,
    card: `${PREFIX}-card`,
    overlay: `${PREFIX}-overlay`,
    overlay2: `${PREFIX}-overlay2`,
    grid: `${PREFIX}-grid`,
    details: `${PREFIX}-details`,
    title: `${PREFIX}-title`,
    cardActions: `${PREFIX}-cardActions`,
}

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.media}`]: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
      },
      [`&.${classes.border}`]: {
        border: 'solid',
      },
      [`&.${classes.fullHeightCard}`]: {
        height: '100%',
      },
      [`&.${classes.card}`]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
      },
      [`&.${classes.overlay}`]: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
      },
      [`&.${classes.overlay2}`]: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
      },
      [`&.${classes.grid}`]: {
        display: 'flex',
      },
      [`&.${classes.details}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      },
      [`&.${classes.title}`]: {
        padding: '0 16px',
      },
      [`&.${classes.cardActions}`]: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
      },
}))


const Product = () => { //Creates the Product display on the frontend
   // const classes = useStyles();
    const product = useSelector((state) => state.product);

    console.log(product);

    return (
        <Root className={classes.mainContainer}>
        <h1>Product </h1> 
        </Root>
    );
}

export default Product;