import { Card, Grid, Box, Badge } from "@mui/material"
import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { Store } from "../../Store";
import './NavBar.css';

export default function NavBar() {

    const { state } = useContext(Store);
    const { cart } = state;
    return (

        <nav className="nav">

            <Card className="cardWrapper">

                <Box className="siteTitle">
                    <Link to="/" className="site-title">Paw-world</Link>
                </Box>

                <Grid className="NavBarGrid">

                    <Link className="productLinkBox" to="/products">
                        Products
                    </Link>
                    
                    <Link className="productLinkBox" to="/cart">Cart{cart.cartItems.length > 0 && (
                        <Badge className="itemsLeftBadge" badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            color="secondary">
                        </Badge>)}
                    </Link>

                    <Link className="productLinkBox" to="/admin">
                        Admin
                    </Link>

                    <Link className="productLinkBox" to="/signup">
                        Signup
                    </Link>

                </Grid >
            </Card >
        </nav >
    )
}