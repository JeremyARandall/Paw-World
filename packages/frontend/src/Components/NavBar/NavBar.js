import { Card, Grid, Box, Badge } from "@mui/material"
import { useContext } from "react";
import { Link, Navigate, useMatch, useNavigate } from "react-router-dom"
import { Store } from "../../Store";
import './NavBar.css';
import SearchBox from "../SearchBox/SearchBox";

export default function NavBar() {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const productsMatch = useMatch("/products");
    const cartMatch = useMatch("/cart");
    const adminMatch = useMatch("/admin");
    //const signupMatch = useMatch( "/signup" );
    const signupMatch = useMatch("/login"); //signup
    const logoutMatch = useMatch("#logout");
    const navigate = useNavigate();

    const logoutHandler = (e) => {
        ctxDispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
    }

    return (

        <nav className="nav">

            <Card className="cardWrapper">

                <Box className="siteTitle">
                    <Link to="/" className="site-title">Paw-world</Link>
                </Box>

                <Grid className="NavBarGrid">

                    <Link className={`navLink ${productsMatch ? "active" : ""}`} to="/search">
                        Products
                    </Link>

                    <Link className={`navLink ${cartMatch ? "active" : ""}`} to="/cart">Cart{cart.cartItems.length > 0 && (
                        <Badge className="itemsLeftBadge" badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                            color="secondary">
                        </Badge>)}
                    </Link>


                    {userInfo !== null && userInfo.isAdmin === true ? (<Link className={`navLink ${adminMatch ? "active" : ""}`} to="/admin">
                        Admin
                    </Link>)
                        : ""}


                    {userInfo && userInfo !== null ? (
                        <Link className={`navLink ${logoutMatch ? "active" : ""}`} to="/" onClick={logoutHandler}>
                            Log Out
                        </Link>) :
                        <Link className={`navLink ${signupMatch ? "active" : ""}`} to="/login">
                            Login
                        </Link>
                    }
                    <SearchBox />
                </Grid >
            </Card >
        </nav >
    )
}