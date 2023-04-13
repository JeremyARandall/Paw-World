import { Card, Grid } from "@mui/material"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
            <Grid>
                <Link to="/" className="site-title">
                    Paw-world
                </Link>

                <Grid>

                    <CustomLink to="/products">Products</CustomLink>

                    <CustomLink to="/cart">Cart</CustomLink>
                    <CustomLink to="/addproducttest">Form</CustomLink>
                    <CustomLink to="/signup">Signup</CustomLink>
                </Grid>
            </Grid>
        </nav>
    )
    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvedPath.pathname, end: true })

        return (

            <Card className={isActive ? "active" : ""} sx={{ padding: 4, color: 'blue' }}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </Card>
        )
    }
}