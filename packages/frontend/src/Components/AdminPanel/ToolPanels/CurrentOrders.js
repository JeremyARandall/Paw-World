import React, {useState, useEffect, useReducer} from "react";
import {TableContainer, TableHead, TableBody, TableRow, TableCell, Stack, Typography, Container, IconButton, Button} from '@mui/material'
import {Check} from '@mui/icons-material';
import logger from 'use-reducer-logger';
import * as api from '../../../api';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, orders: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

function Product(props){
	const {product} = props;
	
	return(
		<Stack
			direction = "row"
			spacing = {2}
		>
			<Typography> ID: {product.productId}</Typography>
			<Typography> Quantity: {product.quantity}</Typography>
			<Typography> Price: {product.price}</Typography>
		</Stack>
	);
}

function OrderRow(props) {
	const {order} = props;
	
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	
	const completeOrder = async () => {
		try {
			const result = await api.updateOrderById(order._id, {...order, dateFulfilled: new Date()});
			alert("Order successfully marked as complete. Please refresh the page to see changes reflected.");
		}
		catch (error) {
			setErrorAlertOpen(true);
			alert("Order completion failed.");
		}
	}
	
	return (
			<TableRow>
				<TableCell align="left"> {order._id} </TableCell>
				<TableCell align="right"> {order.userId} </TableCell>
				<TableCell align="right">
					{order.products.map( (product) => (
							<Product product = {product}/>
					))}
				</TableCell>
				<TableCell align="right"> {order.datePlaced.split("T")[0]} </TableCell>
				<TableCell align="center">
					<IconButton
						aria-label="check"
						size="small"
						onClick={() => completeOrder()}
					>
						<Check/>
					</IconButton>
				</TableCell>
			</TableRow>
	);
}

export default function CurrentOrders() {
	
	const [{ loading, error, orders }, dispatch] = useReducer(logger(reducer), {
		orders: [],
		loading: true,
		error: '',
	})

	useEffect(() => {

		const getCurrentOrders = async () => {
			
			dispatch({ type: 'FETCH_REQUEST' });
			
			try {
				const result = await api.fetchCurrentOrders();
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}
		
		getCurrentOrders();
		
	}, []);
	
	if (orders.length == 0) {
		return(
			<Container>
				<Typography align="center"> No orders found. </Typography>
			</Container>
		);
	}
		
	return(
		<Container>
			<TableContainer align = "center">
			
				<TableHead>
					<TableRow>
						<TableCell align="left"> ID </TableCell>
						<TableCell align="right"> User ID </TableCell>
						<TableCell align="center"> Items </TableCell>
						<TableCell align="right"> Date Placed </TableCell>
						<TableCell align="center"> Mark Complete </TableCell>
					</TableRow>
				</TableHead>
				
				<TableBody>
					{orders.map( (order) => (
						<OrderRow order = {order}/>
						
					))}
				</TableBody>
				
			</TableContainer>
		</Container>
	);
}