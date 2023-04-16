import React from "react";
import {Container, Card, Box, TextField, Button, Stack, Alert, Collapse} from '@mui/material'
import * as api from '../../../api';

export default function ModifyProduct() {
	
	const getProducts = async () => {
		try {
			const result = await api.fetchProducts();
		} catch (err) {

		}
	}
	
	const products = getProducts();
	
	return(
		<Container>
			<Box>
			</Box>
		</Container>
	);
}