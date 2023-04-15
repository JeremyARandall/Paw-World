import { Card, Grid, Box } from "@mui/material"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <Card >
                <Box className="siteTitle">
                    <Link to="/" className="site-title">Paw-world</Link>
                </Box>
                <Grid>
                    <Link to="/products">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/addproducttest">Form</Link>
                    <Link to="/signup">Signup</Link>
                </Grid>
            </Card>
        </nav>
    )
}