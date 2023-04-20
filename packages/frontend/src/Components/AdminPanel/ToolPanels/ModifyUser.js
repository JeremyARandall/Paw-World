import React, {useState, useEffect, useReducer} from "react";
import {TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, IconButton, Box, Container, Stack, Button, TextField, Alert, Collapse} from '@mui/material'
import {ExpandMore, ExpandLess} from '@mui/icons-material'
import logger from 'use-reducer-logger';
import * as api from '../../../api';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, users: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
}

function UserEditor(props) {
	
	const {user} = props;
	const [userData, setUserData] = useState(user);
	
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.updateUserById(user._id, userData);
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
					label = "New Username"
					fullWidth
					margin = "dense"
					value = {userData.username}
					onChange = {
						(e) => setUserData({ ...userData, username: e.target.value })
					}
				/>
				
				<TextField
					label = "New Email"
					fullWidth
					margin = "dense"
					value = {userData.email}
					onChange = {
						(e) => setUserData({ ...userData, email: e.target.value })
					}
				/>
				
				<TextField
					label = "New Phone"
					fullWidth
					margin = "dense"
					value = {userData.phone}
					onChange = {
						(e) => setUserData({ ...userData, phone: e.target.value })
					}
				/>
				
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

function UserRow(props) {
	const {user} = props;
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
				
				<TableCell align="left"> {user._id} </TableCell>
				<TableCell align="right"> {user.username} </TableCell>
				<TableCell align="right"> {user.email} </TableCell>
				<TableCell align="right"> {user.phone} </TableCell>
				<TableCell align="right"> {String(user.isAdmin)} </TableCell>
			</TableRow>
			
			
			<TableRow>
				<TableCell sx={{paddingBottom: '0px', paddingTop: '0px'}} />
				<TableCell sx={{paddingBottom: '0px', paddingTop: '0px'}} colSpan={5}>
					<Collapse in = {open}>
						<Box>
							<UserEditor user = {user}/>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default function ModifyUser() {
	
	const [{ loading, error, users }, dispatch] = useReducer(logger(reducer), {
		users: [],
		loading: true,
		error: '',
	})

	useEffect(() => {

		const getUsers = async () => {
			
			dispatch({ type: 'FETCH_REQUEST' });
			
			try {
				const result = await api.fetchUsers();
				dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: err.message });
			}
		}
		
		getUsers();
		
	}, []);
	
	if (users.length == 0) {
		return(
			<Container>
				<Typography align="center"> No users found. </Typography>
			</Container>
		);
	}
		
	return(
		<Container>
			<TableContainer align = "center">
			
				<TableHead>
					<TableRow>
						<TableCell/>
						<TableCell align="left"> ID </TableCell>
						<TableCell align="right"> Username </TableCell>
						<TableCell align="right"> Email </TableCell>
						<TableCell align="right"> Phone </TableCell>
						<TableCell align="right"> Admin </TableCell>
					</TableRow>
				</TableHead>
				
				<TableBody>
					{users.map( (user) => (
						<UserRow user = {user}/>
					))}
				</TableBody>
				
			</TableContainer>
		</Container>
	);
}