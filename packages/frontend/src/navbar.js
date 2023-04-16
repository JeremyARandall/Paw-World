import { Card, Grid, Box, Badge } from "@mui/material"
import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css';
import { Store } from "./Store";

export default function Navbar() {
    const { state } = useContext(Store);
    const { cart } = state;
    return (
        <nav className="nav">
            <Card >
                <Box className="siteTitle">
                    <Link to="/" className="site-title">Paw-world</Link>
                </Box>
                <Grid className="NavBarGrid">
                    <Link className="productLinkBox" to="/products">Products</Link>
                    <Link className="productLinkBox" to="/cart">Cart
                        {cart.cartItems.length > 0 && (
                            <Badge badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                color="secondary">

                            </Badge>)}</Link>
                    <Link className="productLinkBox" to="/addproducttest">Form</Link>
                    <Link className="productLinkBox" to="/signup">Signup</Link>
                </Grid>
            </Card>
        </nav>
    )
}