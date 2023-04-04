import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { createProduct } from '../../actions/product';


const Form = () => {
    //    const classes = useStyles();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({
        name: '', description: '', brand: '', price: 0, tags: [], productImage: '', stockRemaining: 0
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createProduct(productData));
    };
    const clear = () => {

    }
    return (

        <Paper>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" >Creating a Product</Typography>
                <TextField name="name" variant="outlined" label="Product Name" fullWidth value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} />
                <TextField name="description" variant="outlined" label="Description" fullWidth value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                <TextField name="brand" variant="outlined" label="Brand" fullWidth value={productData.brand} onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
                <TextField name="price" variant="outlined" label="Price" fullWidth value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags (comma separated)" fullWidth value={productData.tags} onChange={(e) => setProductData({ ...productData, tags: e.target.value.split(',') })} />
                <div ><FileBase type="file" multiple={false} onDone={({ base64 }) => setProductData({ ...productData, productImage: base64 })} /></div>
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Form;