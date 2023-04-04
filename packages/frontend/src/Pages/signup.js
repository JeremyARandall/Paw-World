import React from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
          return { ...state, loading: true };
        case 'FETCH_SUCCESS':
          return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: action.payload };
        default:
          return state;
    }
}
const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto' }
    const headerStyle = { margin: '0' }
    const avatarStyle = { backgroundColor: 'green' }

    const [{loading, error, loggedIn, signUp, user }, dispatch] = usereducer(userReducer, {
        loading: true,
        error: '',
        loggedIn: false,
        signUp: true,
        user: {},
    })
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption'>Please fill out this form to create an account.</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Email'></TextField>
                    <TextField fullWidth label='Password'></TextField>
                    <Button type='submit' variant='contained' color='primary'>Sign Up</Button>
                </form>
            </Paper>
        </Grid>

    )
}

export default Signup;