import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import * as api from '../api';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const paperStyle = {
    padding: '3.5rem', width: '80%', maxWidth: '900px', margin: '20px auto', backgroundColor: '#B2CAEB', '@media (maxWidth:600px)': {
      padding: '1.5rem',
      width: '100%',
      margin: '0 auto',
      borderRadius: '0',
    },
  };
  const headerStyle = { margin: '0', fontSize: '50px', paddingTop: '0px' };
  const avatarStyle = { backgroundColor: '#375c8f', width: '110px', height: '110px', marginBottom: '10px', marginTop: '0px' };
  const formStyle = { marginTop: '20px' };
  const textFieldStyle = { marginBottom: '20px', backgroundColor: 'white' };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    passwordHash: '',
    salt: 'unsalted'

  })


  const newUser = async (e) => {
    e.preventDefault();
    try {
      await api.createUser(userData);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundColor: '#375c8f' }}>
      <Paper elevation={20} style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item>
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5" style={headerStyle}>
              Sign Up
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Please fill out this form to create an account.</Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} style={formStyle}>
            <form onSubmit={newUser}>
              <TextField fullWidth label="Email" style={textFieldStyle} value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
              <TextField fullWidth label="Userame" style={textFieldStyle} value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
              <TextField fullWidth label="First Name" style={textFieldStyle} value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
              <TextField fullWidth label="Last Name" style={textFieldStyle} value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
              <TextField fullWidth label="Phone" style={textFieldStyle} value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
              <TextField fullWidth type="password" label="Password" style={textFieldStyle} value={userData.passwordHash} onChange={(e) => setUserData({ ...userData, passwordHash: e.target.value })} />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Signup;
