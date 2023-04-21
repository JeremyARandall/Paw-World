import './Checkout.css';
import './Pages.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextField, Box, Grid, List, ListItem, Typography } from '@mui/material';
import { useContext } from "react"
import { Store } from "../Store";

export default function Checkout( ) 
{
    const navigate = useNavigate( );
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems }, } = state;

    const returnToProductsPage = ( ) => 
    {
        //remove all items from cart

        //navigate back to products page
        navigate( '/Products')
    }

    /*
    const applyDiscountCode = ( ) =>
    {

    }
    */

    /*
    const addShippingToOrder = ( ) =>
    {

    }
    */

    return (
        //if done loading, display checkout page
        <div className="CheckoutDiv">
            <Box /* box for the title of Checkout page */ className="checkoutTitleWrapper">
                <h1 className="CheckoutTitle">Checkout</h1>
            </Box>

            <Box /* box for discount */ className="checkoutDiscountBox">
                <form>
                    <TextField fullWidth label='Discount Code'></TextField>
                </form>
            </Box>

            <Box /* box for shipping */ className="checkoutShippingBox">
                <form>
                    <TextField label='Address Line 1'></TextField>
                    <TextField label='Address Line 2'></TextField>
                    <TextField label='Apt/Suite Number'></TextField>
                    <TextField label='City'></TextField>
                    <TextField label='State'></TextField>
                    <TextField label='Zip code'></TextField>
                    <TextField fullWidth label='Special Delivery Instructions'></TextField>
                </form>
            </Box>
            <Grid /* grid for display of items in cart */ item>
                { cartItems.length == 0 ? ( 
                <Alert severity="warning">Cart is empty</Alert>
                ) :
                    (
                        <List className='checkoutItems'>
                            { cartItems.map((item) => {
                                return <ListItem className='checkoutItem' key={item._id}>
                                    <Typography className="checkoutItemName">{item.name}</Typography>
                                </ListItem>
                            })}
                        </List>
                    )
                }
            </Grid>
            
            <Grid /* grid for subtotal/tax/total */ className='checkoutTotalGrid' item>
                <Box className="checkoutSubtotal">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '} items) : <span style={{color: "red" }}>$
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
                </Box>
                <Box className="checkoutTax">Taxes</Box>
                <Box className="checkoutTotal">Total</Box>
            </Grid>
            
            <Box /* box for button to pay and return to products page */ className="checkoutPayBox">
                <Button className="checkoutPayButton" type="button" onClick={returnToProductsPage} variant="secondary" disabled={cartItems.length === 0}>Pay</Button>
            </Box>
        </div>            
    )
}