import React from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto' }
    const headerStyle = { margin: '0' }
    const avatarStyle = { backgroundColor: 'green' }
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