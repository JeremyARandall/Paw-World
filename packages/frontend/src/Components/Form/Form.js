import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createProduct } from '../../actions/product';
 
const PREFIX = 'Form';
const classes = {
    root: `${PREFIX}-root`,
    paper: `${PREFIX}-paper`,
    form: `${PREFIX}-form`,
    fileInput: `${PREFIX}-fileInput`,
    buttonSubmit: `${PREFIX}-buttonSubmit`
}
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        margin: theme.spacing(1),
    },
    [`&.${classes.paper}`]: {
        padding: theme.spacing(2),
    },
    [`&.${classes.form}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    [`&.${classes.fileInput}`]: {
        width: '97%',
        margin: '10px 0',
    },
    [`&.${classes.buttonSubmit}`]: {
        marginBottom: 10,
    },
}))
const Form = () => {
//    const classes = useStyles();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        seller: '', title: '', price: '', tags: '', selectedFile: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createProduct(productData));
    };
    const clear = () => {

    }
    return (
        <Root className={classes.root}>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Product</Typography>
            <TextField name="creator" variant="outlined" label="Seller" fullWidth value={productData.seller} onChange={(e) => setProductData({ ...productData, seller: e.target.value })} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={productData.title} onChange={(e) => setProductData({ ...productData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Price" fullWidth value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={productData.tags} onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(',') })} />
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper></Root>
      );
};

export default Form;