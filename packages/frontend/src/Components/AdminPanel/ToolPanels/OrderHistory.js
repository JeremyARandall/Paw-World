import React, {useState, useEffect, useReducer} from "react";
import {TableContainer, TableHead, TableBody, TableRow, TableCell, Stack, Typography, Container, Button} from '@mui/material'
import {palette} from '@mui/system'
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
				<TableCell align="right"> {order.dateFulfilled.split("T")[0]} </TableCell>
			</TableRow>
	)
}

export default function OrderHistory() {
	
	const [sortType, setSortType] = useState("order_date");

	const updateSortType = (panelName) => {
		setSortType(panelName);
	}
	
	const [{ loading, error, orders }, dispatch] = useReducer(logger(reducer), {
		orders: [],
		loading: true,
		error: '',
	})

	useEffect(() => {

		const getPastOrders = async () => {
			
			dispatch({ type: 'FETCH_REQUEST' });
			
			try {
				const result = await api.fetchPastOrders();
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}
		
		getPastOrders();
		
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
			
			<Stack
				direction = "row"
				justifyContent = "center"
				alignItems = "center"
				spacing = {2}
				marginTop = "15px"
				marginBottom = "15px"
			>
				<Button
					size = "small"
					variant = { (sortType === "order_date") ? "contained" : "outlined" }
					onClick = { () => updateSortType("order_date") }
				>
					Order Date
				</Button>
				
				<Button
					size = "small"
					variant = { (sortType === "customer_name") ? "contained" : "outlined" }
					onClick = { () => updateSortType("customer_name") }
				>
					Customer Name
				</Button>
				
				<Button
					size = "small"
					variant = { (sortType === "order_price") ? "contained" : "outlined" }
					onClick = { () => updateSortType("order_price") }
				>
					Order Price
				</Button>
			</Stack>
			
			<TableContainer align = "center">
			
				<TableHead>
					<TableRow>
						<TableCell align="left"> ID </TableCell>
						<TableCell align="right"> User ID </TableCell>
						<TableCell align="center"> Items </TableCell>
						<TableCell align="right"> Date Placed </TableCell>
						<TableCell align="right"> Date Fulfilled </TableCell>
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