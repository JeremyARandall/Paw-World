import React, {setState, useState} from "react";
import {Container, TextField, Button, Stack} from '@mui/material'
import FileBase from 'react-file-base64';
import * as api from '../../../api'

const CreateItems = () => {

	const [productData, setProductData] = useState({
        name: '', description: '', brand: '', price: null, tags: [], productImage: '', stockRemaining: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createProduct(productData);
        } catch (err) {

        }
    };
	
    const clear = () => {

    }

	return (
		<Container>
			<form autoComplete = "off"
				noValidate
				onSubmit = {handleSubmit}
			>
			
				<TextField
					name = "name"
					label = "Product Name"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.name}
					onChange = {
						(e) => setProductData({ ...productData, name: e.target.value })
					}
				/>
				
				<TextField
					name = "description"
					label = "Description"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.description}
					onChange = {
						(e) => setProductData({ ...productData, description: e.target.value })
					}
				/>
				
				<TextField
					name = "brand"
					label = "Brand"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.brand}
					onChange = {
						(e) => setProductData({ ...productData, brand: e.target.value })
					}
				/>
				
				<TextField
					name = "price"
					label = "Price"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.price}
					onChange = {
						(e) => setProductData({ ...productData, price: e.target.value })
					}
				/>
				
				<TextField
					name = "stockRemaining"
					label = "Stock Remaning"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.stockRemaining}
					onChange = {
						(e) => setProductData({ ...productData, stockRemaining: e.target.value})
					}
				/>
				
				<TextField
					name = "tags"
					label = "Tags (comma separated)"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {productData.tags}
					onChange = {
						(e) => setProductData({ ...productData, tags: e.target.value.split(',') })
					}
				/>
				
				<div style = {{
					marginTop: "10px",
					marginBottom: "10px"
				}}>
					<FileBase
						type = "file"
						multiple = {false}
						onDone = {
							({ base64 }) => setProductData({ ...productData, productImage: base64 })
						}
					/>
				</div>
				
				<Stack
					direction = "row"
					justifyContent = "center"
					alignItems = "center"
					spacing = {2}
					marginBottom = "30px"
				>
					<Button
						variant = "contained"
						type = "submit"
						padding = "10px"
					>
						Submit
					</Button>
					
					<Button
						variant = "contained"
						onClick = {clear}
					>
						Clear
					</Button>
				</Stack>
				
			</form>
		</Container>
	)
}

export default CreateItems;