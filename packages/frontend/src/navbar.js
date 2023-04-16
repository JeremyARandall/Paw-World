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
				
                <Grid className="NavBarGrid">
				
                    <Link className="productLinkBox" to="/products">
						Products
					</Link>
					
                    <Link className="productLinkBox" to="/cart">
						Cart
					</Link>
					
                    <Link className="productLinkBox" to="/admin">
						Admin
					</Link>
					
                    <Link className="productLinkBox" to="/signup">
						Signup
					</Link>
					
                </Grid>
            </Card>
        </nav>
    )
	
}