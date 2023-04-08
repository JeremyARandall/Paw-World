import { Alert, Grid, List, ListItem } from "@mui/material";
import { useContext } from "react"
import { Store } from "../Store";


export default function Cart() {
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
                                    <ListItem key={item._id}>
                                        {item.name}
                                    </ListItem>
                                })}
                            </List>
                        )}
                </Grid>
                <Grid item xd={8}>

                </Grid>
            </Grid>
        </div>
    )
}