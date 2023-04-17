import { Card, Grid, Box, Badge } from "@mui/material"
import { useContext } from "react";
import { Link, useMatch } from "react-router-dom"
import { Store } from "../../Store";
import './NavBar.css';

export default function NavBar() {

    const { state } = useContext(Store);
    const { cart } = state;
    const productsMatch = useMatch( "/products" );
    const cartMatch = useMatch( "/cart" );
    const adminMatch = useMatch( "/admin" );
    //const signupMatch = useMatch( "/signup" );
    const signupMatch = useMatch( "/login" ); //signup
    const signup = useMatch( "/signup" ); 

    return (

        <nav className="nav">

            <Card className="cardWrapper">

                <Box className="siteTitle">
                    <Link to="/" className="site-title">Paw-world</Link>
                </Box>

                <Grid className="NavBarGrid">

                    <Link className={ `navLink ${ productsMatch ? "active" : "" }` } to="/products">
                        Products
                    </Link>
                    
                    <Link className={ `navLink ${ cartMatch ? "active" : "" }` } to="/cart">Cart{cart.cartItems.length > 0 && (
                        <Badge className="itemsLeftBadge" badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            color="secondary">
                        </Badge>)}
                    </Link>

                    <Link className={ `navLink ${ adminMatch ? "active" : "" }` } to="/admin">
                        Admin
                    </Link>

                    <Link className={ `navLink ${ signupMatch ? "active" : "" }` } to="/login">
                        Login
                    </Link>
                    <Link className={ `navLink ${ signup ? "active" : "" }` } to="/signup"> 
                        Login 
                    </Link>

                </Grid >
            </Card >
        </nav >
    )
}