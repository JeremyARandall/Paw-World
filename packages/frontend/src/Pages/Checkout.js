import './Checkout.css';
import './Pages.css';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextField, Box, Grid, List, ListItem, Typography } from '@mui/material';
import { useContext, useState } from "react"
import { Store } from "../Store";
import * as api from '../api';

export default function Checkout() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const { cart, cart: cartItems, userInfo, } = state;
    //const [subtotal, setSubtotal] = useState((cartItems.reduce((a, c) => a + c.price * c.quantity, 0)));
    //const [taxes, setTaxes] = useState(Math.round((subtotal * 0.0825 + Number.EPSILON) * 100) / 100);
    //const [total, setTotal] = useState(subtotal + taxes);
    const [discount, setDiscount] = useState("");
    const [orderData, setOrderData] = useState({
        userId: userInfo._id,
        subtotal: 0,
        tax: 0,
        total: 0,
        dicount: '',
        Address1: '',
        Address2: '',
        Apt: null,
        City: '',
        State: '',
        ZIP: null,
        products: [],
        Instructions: '',
        datePlaced: new Date()
    });
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        brand: '',
        price: "",
        tags: [],
        productImage: '',
        stockRemaining: ""
    });
    cart.subtotal = cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
    cart.taxes = Math.round((cart.subtotal * 0.0825 + Number.EPSILON) * 100) / 100;
    cart.total = cart.taxes + cart.subtotal;
    /*const [price, setPrice] = useState({
        subtotal: cartItems.reduce((a, c) => a + c.price * c.quantity, 0),
        taxes: Math.round((cartItems.reduce((a, c) => a + c.price * c.quantity, 0) * 0.0825 + Number.EPSILON) * 100) / 100,
        total: Math.round((cartItems.reduce((a, c) => a + c.price * c.quantity, 0) * 1.0825 + Number.EPSILON) * 100) / 100,
    })
*/
    const placeOrderHandler = async () => {

        //create new Order
        setOrderData({ ...orderData, total: cart.total, subtotal: cart.subtotal, tax: cart.tax })
        try {
            await api.createOrder(orderData);
            setOrderPlaced(true);
        } catch (err) {
            console.error(err);
        }
        //remove items in order from inventory
        if (setOrderPlaced) {
            (cart.cartItems.map(async (item) => {
                try {
                    const { data } = await api.fetchProductById(item._id);
                    const remaining = data.stockRemaining - item.quantity;
                    setProductData({
                        name: item.name,
                        brand: item.brand,
                        price: item.price,
                        productImage: item.productImage,
                        stockRemaining: remaining,
                        tags: item.tags
                    });
                    setProductData({ ...productData, stockRemaining: remaining })
                    await api.updateProductById(item._id, productData);
                } catch (err) {
                    console.error(err);
                }
            }))
        }
        //remove all items from cart
        ctxDispatch({ type: "CLEAR_CART_STOCK" });
        localStorage.removeItem('cartItems');
        //navigate back to products page
        navigate('/Products');
    }
    /*const priceChanger = (c, q, p) => { //accept the cost and quantity of a product and the percent off, apply it to the total
    
    }
    */

    const applyDiscountCode = async (e) => {
        /*  e.preventDefault();
          try {
              const { data } = await api.fetchDiscountByName(discount);
              var percent = data.percent;
              cartItems.map((item) =>
                  data.productIds.indexOf(item._id) > -1 ?
                      (setPrice({
                          price.subtotal = 
                      })) : "");
     
     
     
     
          } catch (err) {
              alert('Invalid discount code');
          }
          */
    }


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
            <Grid className="checkoutWrapper">
                <Grid /* grid for display of items in cart */ item className='checkoutItems'>
                    {cartItems.length === 0 ? (
                        <Alert severity="warning">Cart is empty</Alert>
                    ) :
                        (
                            <List className="checkout">
                                {cart.cartItems.map((item) => {
                                    return <ListItem className="checkoutItem" key={item._id}>
                                        <Typography className="checkoutItemName">{item.name}  ({item.quantity})</Typography>
                                        <Typography className="productInCartQuantity"><span style={{ color: "red" }}>${item.price}</span></Typography>
                                    </ListItem>
                                })}
                            </List>
                        )
                    }

                    <Grid /* grid for subtotal/tax/total */ className='checkoutTotalGrid' item>
                        <Box className="checkoutSubtotal">
                            Subtotal : <span style={{ color: "red" }}>$
                                {cart.subtotal}</span>
                        </Box>
                        <Box className="checkoutTax">Taxes : <span style={{ color: "red" }}>$
                            {cart.taxes}</span>
                        </Box>
                        <Box className="checkoutTotal">Total : <span style={{ color: "red" }}>$
                            {cart.total}</span>
                        </Box>
                    </Grid>
                </Grid>

                <Grid className='rightSide'>
                    <Box /* box for shipping */ className="checkoutShippingBox">
                        <form>
                            <TextField fullWidth label='Address Line 1' onChange={(e) => setOrderData({ ...orderData, Address1: e.target.value })}></TextField>
                            <TextField fullWidth label='Address Line 2' onChange={(e) => setOrderData({ ...orderData, Address2: e.target.value })}></TextField>
                            <TextField label='Apt/Suite Number' onChange={(e) => setOrderData({ ...orderData, Apt: e.target.value })}></TextField>
                            <TextField label='City' onChange={(e) => setOrderData({ ...orderData, City: e.target.value })}></TextField>
                            <TextField label='State' onChange={(e) => setOrderData({ ...orderData, State: e.target.value })}></TextField>
                            <TextField label='Zip code' onChange={(e) => setOrderData({ ...orderData, ZIP: e.target.value })}></TextField>
                            <TextField className="deliveryInstructions" fullWidth label='Special Delivery Instructions' onChange={(e) => setOrderData({ ...orderData, Instructions: e.target.value })}></TextField>
                        </form>
                    </Box>

                    <Box /* box for discount */ className="checkoutDiscountBox" display="flex">
                        <form>
                            <TextField className="discountCode" label='Discount Code' onChange={(e) => { setDiscount(e.target.value) }}></TextField>
                        </form>
                        <Button className="discountButton" type="button" onClick={applyDiscountCode}>Apply</Button>
                    </Box>

                    <Box /* box for button to pay and return to products page */ className="checkoutPayBox">
                        <Button className="checkoutPayButton" type="button" onClick={placeOrderHandler} variant="secondary" disabled={cart.cartItems.length === 0}>Pay</Button>
                    </Box>
                </Grid>

            </Grid>
        </div>
    )
}