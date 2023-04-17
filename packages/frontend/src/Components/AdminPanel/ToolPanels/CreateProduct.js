import React, {useState} from "react";
import {Container, TextField, Button, Stack, Alert, Collapse} from '@mui/material'
import FileBase from 'react-file-base64';
import * as api from '../../../api'

export default function CreateProducts() {

	const [productData, setProductData] = useState({
        name: '',
		description: '',
		brand: '',
		price: "",
		tags: [],
		productImage: '',
		stockRemaining: ""
    });
	
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createProduct(productData);
			clear()
			setSuccessAlertOpen(true)
        } catch (err) {
			setErrorAlertOpen(true)
        }
    }
	
    const clear = () => {
		setProductData({name: '', description: '', brand: '', price: "", tags: [], productImage: '', stockRemaining: ""});
    }

	return (
		<Container>
			<form autoComplete = "off"
				noValidate
				onSubmit = {handleSubmit}
			>
			
				<TextField
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
					label = "Tags (Comma separated.)"
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
			
			<Collapse in = {successAlertOpen}>
				<Alert
					variant = "outlined"
					severity = "success"
					onClose = {
						() => { setSuccessAlertOpen(false) }
					}
				>
					Product successfully submitted.
				</Alert>
			</Collapse>
			
			<Collapse in = {errorAlertOpen}>
				<Alert
					variant = "outlined"
					severity = "error"
					onClose = {
						() => { setErrorAlertOpen(false) }
					}
				>
					Error submitting product.
				</Alert>
			</Collapse>
			
		</Container>
	);
}