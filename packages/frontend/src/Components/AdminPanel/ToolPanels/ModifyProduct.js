import React, {useState, useEffect, useReducer} from "react";
import {TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Container, Stack, Button, TextField, Alert, Collapse} from '@mui/material'
import {ExpandMore, ExpandLess} from '@mui/icons-material'
import FileBase from 'react-file-base64';
import logger from 'use-reducer-logger';
import * as api from '../../../api';

const reducer = (state, action) => {
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

function ProductEditor(props) {
	
	const {product} = props;
	const [productData, setProductData] = useState(product);
	
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.updateProductById(product._id, productData);
			setSuccessAlertOpen(true)
		} catch (err) {
			setErrorAlertOpen(true)
		}
	}
	
	return (
		<Container>
			<form autoComplete = "off"
					noValidate
					onSubmit = {handleSubmit}
			>
				<TextField
					label = "New Name"
					fullWidth
					margin = "dense"
					value = {productData.name}
					onChange = {
						(e) => setProductData({ ...productData, name: e.target.value })
					}
				/>
				<TextField
					label = "New Description"
					fullWidth
					margin = "dense"
					value = {productData.description}
					onChange = {
						(e) => setProductData({ ...productData, description: e.target.value })
					}
				/>
				<TextField
					label = "New Brand"
					fullWidth
					margin = "dense"
					value = {productData.brand}
					onChange = {
						(e) => setProductData({ ...productData, brand: e.target.value })
					}
				/>
				<TextField
					label = "New Price"
					fullWidth
					margin = "dense"
					value = {productData.price}
					onChange = {
						(e) => setProductData({ ...productData, price: e.target.value })
					}
				/>
				<TextField
					label = "New Stock Count"
					fullWidth
					margin = "dense"
					value = {productData.stockRemaining}
					onChange = {
						(e) => setProductData({ ...productData, stockRemaining: e.target.value})
					}
				/>
				<TextField
					label = "New Tags (Comma separated.)"
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
					justifyContent = "center"
					alignItems = "center"
					spacing = {2}
					marginTop = "15px"
					marginBottom = "15px"
				>
					<Button
						variant = "contained"
						type = "submit"
						padding = "10px"
					>
						Submit Changes
					</Button>
				</Stack>
				
				<Box sx={{paddingBottom: "10px"}}>
					<Collapse in = {successAlertOpen}>
						<Alert
							variant = "outlined"
							severity = "success"
							onClose = {
								() => { setSuccessAlertOpen(false) }
							}
						>
							Changes successfully submitted.
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
							Error submitting changes.
						</Alert>
					</Collapse>
				</Box>
			</form>
		</Container>
	);
}

function ProductRow(props) {
	const {product} = props;
	const [open, setOpen] = useState(false);
	
	return (
		<React.Fragment>
			<TableRow>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <ExpandLess/> : <ExpandMore/>}
					</IconButton>
				</TableCell>
				
				<TableCell align="left"> {product._id} </TableCell>
				<TableCell align="right"> {product.brand} </TableCell>
				<TableCell align="right"> {product.name} </TableCell>
				<TableCell align="right"> {product.stockRemaining} </TableCell>
				<TableCell align="right"> {product.dateCreated.split("T")[0]} </TableCell>
			</TableRow>
			
			
			<TableRow>
				<TableCell sx={{paddingBottom: '0px', paddingTop: '0px'}} />
				<TableCell sx={{paddingBottom: '0px', paddingTop: '0px'}} colSpan={5}>
					<Collapse in = {open}>
						<Box>
							<ProductEditor product = {product}/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default function ModifyProduct() {
	
	const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
		products: [],
		loading: true,
		error: '',
	})

	useEffect(() => {

		const getProducts = async () => {
			
			dispatch({ type: 'FETCH_REQUEST' });
			
			try {
				const result = await api.fetchProducts();
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}
		
		getProducts();
		
	}, []);
	
	return(
		<Container>
			<TableContainer align = "center">
			
				<TableHead>
					<TableRow>
						<TableCell/>
						<TableCell align="left"> ID </TableCell>
						<TableCell align="right"> Brand </TableCell>
						<TableCell align="right"> Name </TableCell>
						<TableCell align="right"> Stock Remaining </TableCell>
						<TableCell align="right"> Date Created </TableCell>
					</TableRow>
				</TableHead>
				
				<TableBody>
					{products.map( (product) => (
						<ProductRow product = {product}/>
					))}
				</TableBody>
				
			</TableContainer>
		</Container>
	);
}