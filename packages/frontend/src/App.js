import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>Products</Typography>
        
      </AppBar>
    </Container>
  );
}

export default App;