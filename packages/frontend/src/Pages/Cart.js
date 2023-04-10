import { Alert, Avatar, Grid, List, ListItem, ListItemAvatar } from "@mui/material";
import { useContext } from "react"
import { Store } from "../Store";
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../api';

export default function Cart() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    return (
        <div>
            <h1>Shopping Cart</h1>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    {cartItems.length === 0 ? (
                        <Alert severity="warning">Cart is empty</Alert>
                    ) :
                        (
                            <List>
                                {cartItems.map((item) => {
                                    return <ListItem key={item._id}>
                                        <ListItemAvatar sx={4}>
                                            <Avatar src={item.productImage} alt={item.name}></Avatar>
                                        </ListItemAvatar>
                                        <Link to={`/products/${item._id}`}>{`${item.id}`}</Link>
                                    </ListItem>
                                })}
                            </List>
                        )}
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </div>
    )
}