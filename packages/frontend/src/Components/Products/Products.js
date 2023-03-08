import React from "react";
import Product from './Product/Product';
//import useStyles from './styles'
import { styled } from "@mui/material/styles";

const PREFIX = 'Products';
const classes = {
    mainContainer: `${PREFIX}-mainContainer`,
    smMargin: `${PREFIX}-smMargin`,
    actionDiv: `${PREFIX}-actionDiv`,
}
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.mainContainer}`]: {
        display: 'flex',
        alignItems: 'center',
    },
    [`&.${classes.smMargin}`]: {
        margin: theme.spacing(1),
    },
    [`&.${classes.actionDiv}`]: {
        textAlign: `center`,
    },
}))
const Products = () => {
    //const classes = useStyles();
    return (
        <Root className={classes.mainContainer}>
            <h1>Products</h1>
            <Product />
            <Product />
        </Root>
    );
}

export default Products;