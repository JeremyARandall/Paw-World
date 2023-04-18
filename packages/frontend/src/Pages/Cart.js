import { Alert, Avatar, Button, Box, Grid, IconButton, List, ListItem, ListItemAvatar, Typography } from "@mui/material";
import { useContext } from "react"
import { Store } from "../Store";
import { Link, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import * as api from '../api';
import './Cart.css';

export default function Cart() {
    const navigate = useNavigate(); //on click navigation for buttons
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item, quantity) => {
        const { data } = await api.fetchProductById(`${item._id}`);
        if (data.stockRemaining < quantity) {
            window.alert('Sorry, product does not have enough stock remaining');
            return;
        }
        ctxDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } })

    }
    const removeItemHandler = (item) => {
        ctxDispatch({ type: 'REMOVE_FROM_CART', payload: item })
    }
    const checkoutHandler = () => {
        navigate('signin?redirect=/checkout')
    }
    return (
        <div className="cartDiv">
            <Box className="shoppingCartTitleWrapper" >
                <h1 className="ShoppingCartTitle" >Shopping Cart</h1>
            </Box>
            
            
            <Grid container className="shoppingCartPage">
                <Grid item > 
                    {cartItems.length === 0 ? (
                        <Alert severity="warning">Cart is empty</Alert>
                    ) :
                        (
                            <List className="listItems">
                                {cartItems.map((item) => {
                                    return <ListItem className="ListItemWrapperCart" key={item._id}>
                                                <ListItemAvatar className={`${ListItemAvatar} listItemAvatar`}>
                                                    <Avatar className="avatar" src={item.productImage} alt={item.name}></Avatar>
                                                </ListItemAvatar>
                                                <Link className="productInCartLink" to={`/products/${item._id}`}>{`${item.name}`}</Link>
                                                <Grid className="productCartGrid">
                                                    <Box>
                                                        <IconButton className="increaseDecreaseButton" aria-label="decrease" onClick={() => addToCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                    </Box>
                                                    <Box>
                                                        <Typography className="productInCartQuantity">
                                                            {item.quantity}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <IconButton className="increaseDecreaseButton" aria-label="increase" onClick={() => addToCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.stockRemaining}>
                                                            <AddCircleIcon/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box>
                                                        <Typography className="productInCartPrice">
                                                            ${item.price}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <IconButton className="removeButton" aria-label="remove" onClick={() => removeItemHandler(item)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Grid>
                                        </ListItem>
                                })}
                            </List>
                        )}
                </Grid>

                <Grid className="subtotalGrid" item  /*displays the subtotal and the total item count*/>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : <span style={{color: "red" }}>$
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
                </Grid>
                <Box className="exitCartButtonWrapper">
                    <Button className="exitCartButton" type="button" onClick={checkoutHandler} variant="secondary" disabled={cartItems.length === 0}>Proceed to Checkout</Button>
                </Box>
            </Grid>
        </div>
    )
}