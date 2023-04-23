import React, { useReducer } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
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
};

const Signup = () => {
  const paperStyle = { padding: '3.5rem', width: '80%', maxWidth: '900px', margin: '20px auto', backgroundColor: '#B2CAEB',  '@media (max-width:600px)': {
    padding: '1.5rem',
    width: '100%',
    margin: '0 auto',
    borderRadius: '0',
  },   };
  const headerStyle = { margin: '0', fontSize: '50px', paddingTop: '0px' };
  const avatarStyle = { backgroundColor: '#375c8f', width: '110px', height: '110px', marginBottom: '10px', marginTop: '0px' };
  const formStyle = { marginTop: '20px' };
  const textFieldStyle = { marginBottom: '20px', backgroundColor: 'white' };

  const [{ loading, error, loggedIn, signUp, user }, dispatch] = useReducer(userReducer, {
    loading: true,
    error: '',
    loggedIn: false,
    signUp: true,
    user: {},
  });

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
            <form>
              <TextField fullWidth label="Email" style={textFieldStyle} />
              <TextField fullWidth label="Name" style={textFieldStyle} />
              <TextField fullWidth label="Phone" style={textFieldStyle} />
              <TextField fullWidth label="Password" style={textFieldStyle} />
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
