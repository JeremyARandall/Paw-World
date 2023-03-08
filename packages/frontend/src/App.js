import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';

import { getProduct } from './actions/product';
import Products from './Components/Products/Products';
import Form from './Components/Form/Form';
//import useStyles from './styles';

const PREFIX = 'App';
const classes = {
  appBar: `${PREFIX}-appBar`,
  heading: `${PREFIX}-heading`,
  image: `${PREFIX}-image`,
}
const Root = styled(`div`)(({ theme }) => ({
  [`&.${classes.root}`]: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`&.${classes.heading}`]: {
    color: 'rgba(0,183,255, 1)',
  },
  [`&.${classes.image}`]: {
    marginLeft: '15px',
  },
}))

const App = () => {
 // const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Root className={classes.root}>
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Products</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
            <Products />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </Root>
  );
}

export default App;