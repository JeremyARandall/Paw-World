import React, { useState, useEffect, useReducer } from "react";
import { TableContainer, TableHead, TableBody, TableRow, TableCell, Stack, Typography, Container, Button } from '@mui/material'
import { palette } from '@mui/system'
import logger from 'use-reducer-logger';
import * as api from '../../../api';

const ordersReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, ordersLoading: true };
		case 'FETCH_SUCCESS':
			return { ...state, orders: action.payload, ordersLoading: false };
		case 'FETCH_FAIL':
			return { ...state, ordersLoading: false, ordersError: action.payload };
		default:
			return state;
	}
}

const usersReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, usersLoading: true };
		case 'FETCH_SUCCESS':
			return { ...state, users: action.payload, usersLoading: false };
		case 'FETCH_FAIL':
			return { ...state, usersLoading: false, usersError: action.payload };
		default:
			return state;
	}
}

function Product(props) {
	const { product } = props;

	return (
		<Stack
			direction="row"
			spacing={2}
		>
			<Typography> ID: {product.productId}</Typography>
			<Typography> Quantity: {product.quantity}</Typography>
			<Typography> Price: {product.price}</Typography>
		</Stack>
	);
}

function OrderRow(props) {
	const { order } = props;

	return (
		<TableRow>
			<TableCell align="left"> {order._id} </TableCell>
			<TableCell align="center"> {order.userId} </TableCell>
			<TableCell align="right">
				{order.products.map((product) => (
					<Product product={product} />
				))}
			</TableCell>
			<TableCell align="center"> {order.total} </TableCell>
			<TableCell align="right"> {order.datePlaced.split("T")[0]} </TableCell>
			<TableCell align="right"> {order.dateFulfilled.split("T")[0]} </TableCell>
		</TableRow>
	)
}

export default function OrderHistory() {

	/*var userLookup = async () => {

		usersDispatch({ type: 'FETCH_REQUEST' });

		try {
			const result = await api.fetchUsers();
			usersDispatch({ type: 'FETCH_SUCCESS', payload: result.data });
		} catch (err) {
			usersDispatch({ type: 'FETCH_FAIL', payload: err.message });
		}
	}; */

	const [sortType, setSortType] = useState();

	const updateSortType = (newSortType) => {
		setSortType(newSortType);
		sortOrders(newSortType);
	}

	const sortOrders = (sortMethod) => {
	
	// -1: a is before b
	//  1: a is after b
	//  0: maintain order
	
		switch (sortMethod){
			
			case "most_recent":
				orders.sort( (a,b) => {
					if (a.datePlaced > b.datePlaced) return -1;
					if (a.datePlaced < b.datePlaced) return 1;
					return 0;
				});
				break;

			case "customer_name":
				orders.sort((a, b) => {

					const userA = users.find((user) => user._id === a.userId);
					const userB = users.find((user) => user._id === b.userId);

					if (userA.lastName === userB.lastName) {

						if (userA.firstName === userB.firstName) return 0;
						if (userA.firstName < userB.firstName) return -1;
						return 1;

					}

					else {
						if (userA.lastName < userB.lastName) return -1;
						return 1;
					}
				});
				break;

			case "most_expensive":
				orders.sort((a, b) => {
					if (a.total == b.total) return 0;
					if (a.total > b.total) return -1;
					return 1;
				});
				break;

			case "least_expensive":
				orders.sort((a, b) => {
					if (a.total == b.total) return 0;
					if (a.total < b.total) return -1;
					return 1;
				});
				break;
			default:

		}
	}

	const [{ ordersLoading, ordersError, orders }, ordersDispatch] = useReducer(logger(ordersReducer), {
		orders: [],
		ordersLoading: true,
		ordersError: '',
	})

	const [{ usersLoading, usersError, users }, usersDispatch] = useReducer(logger(usersReducer), {
		users: [],
		usersLoading: true,
		usersError: '',
	})

	useEffect(() => {

		const getPastOrders = async () => {

			ordersDispatch({ type: 'FETCH_REQUEST' });

			try {
				const result = await api.fetchPastOrders();
				ordersDispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				ordersDispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}

		const getUsers = async () => {

			usersDispatch({ type: 'FETCH_REQUEST' });

			try {
				const result = await api.fetchUsers();
				usersDispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				usersDispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}

		getPastOrders();
		updateSortType("most_recent");

		getUsers();

	}, []);

	if (orders.length == 0) {
		return (
			<Container>
				<Typography align="center"> No orders found. </Typography>
			</Container>
		);
	}

	return (
		<Container>

			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				spacing={2}
				marginTop="15px"
				marginBottom="15px"
			>
				<Button
					size="small"
					variant={(sortType === "most_recent") ? "contained" : "outlined"}
					onClick={() => updateSortType("most_recent")}
				>
					Most Recent
				</Button>

				<Button
					size="small"
					variant={(sortType === "customer_name") ? "contained" : "outlined"}
					onClick={() => updateSortType("customer_name")}
				>
					Customer Name (A-Z)
				</Button>

				<Button
					size="small"
					variant={(sortType === "most_expensive") ? "contained" : "outlined"}
					onClick={() => updateSortType("most_expensive")}
				>
					Most Expensive
				</Button>

				<Button
					size="small"
					variant={(sortType === "least_expensive") ? "contained" : "outlined"}
					onClick={() => updateSortType("least_expensive")}
				>
					Least Expensive
				</Button>
			</Stack>

			<TableContainer align="center">

				<TableHead>
					<TableRow>
						<TableCell align="left"> ID </TableCell>
						<TableCell align="center"> User ID </TableCell>
						<TableCell align="center"> Items </TableCell>
						<TableCell align="center"> Total Price </TableCell>
						<TableCell align="right"> Date Placed </TableCell>
						<TableCell align="right"> Date Fulfilled </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{orders.map((order) => (
						<OrderRow order={order} />
					))}
				</TableBody>

			</TableContainer>
		</Container>
	);
}