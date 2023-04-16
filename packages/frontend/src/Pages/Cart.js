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
        <div>
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
                                    return <ListItem key={item._id}>
                                        <ListItemAvatar className={`${ListItemAvatar} listItemAvatar`}>
                                            <Avatar className="avatar" src={item.productImage} alt={item.name}></Avatar>
                                        </ListItemAvatar>
                                        <Link to={`/products/${item._id}`}>{`${item.name}`}</Link>
                                        <IconButton aria-label="decrease" onClick={() => addToCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                            <RemoveCircleIcon />
                                        </IconButton>
                                        <Typography>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton aria-label="increase" onClick={() => addToCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.stockRemaining}>
                                            <AddCircleIcon />
                                        </IconButton>
                                        <Typography>
                                            ${item.price}
                                        </Typography>
                                        <IconButton aria-label="remove" onClick={() => removeItemHandler(item)}>
                                            <DeleteIcon />
                                        </IconButton>

                                    </ListItem>
                                })}
                            </List>
                        )}
                </Grid>

                <Grid item  /*displays the subtotal and the total item count*/>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </Grid>

                <Button type="button" onClick={checkoutHandler} variant="secondary" disabled={cartItems.length === 0}>Proceed to Checkout</Button>
            </Grid>
        </div>
    )
}