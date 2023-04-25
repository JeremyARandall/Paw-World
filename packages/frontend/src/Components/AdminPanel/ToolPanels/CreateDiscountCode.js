import React, {useState} from "react";
import {Container, TextField, Button, Stack, Alert, Collapse} from '@mui/material'
import * as api from '../../../api'

export default function CreateDiscountCode() {
	
	const [discountData, setDiscountData] = useState({
        name: '', percent: '', code: '', expiration: '', productIds: [], userIds: []
    });
	
	const [successAlertOpen, setSuccessAlertOpen] = useState(false);
	const [errorAlertOpen, setErrorAlertOpen] = useState(false);
	
	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
			setDiscountData({ expiration: new Date(discountData.expiration)});
            await api.createDiscount(discountData);
			clear();
			setSuccessAlertOpen(true);
        } catch (err) {
			console.log(err);
			setErrorAlertOpen(true);
        }
    };
	
	const clear = () => {
		setDiscountData({name: '', percent: '', code: '', expiration: '', productIds: [], userIds: []});
    }
	
	return(
		<Container>
			<form autoComplete = "off"
				noValidate
				onSubmit = {handleSubmit}
			>
				
				<TextField
					name = "name"
					label = "Discount Name"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {discountData.name}
					onChange = {
						(e) => setDiscountData({ ...discountData, name: e.target.value })
					}
				/>
				
				<TextField
					name = "percent"
					label = "Percent"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {discountData.percent}
					onChange = {
						(e) => setDiscountData({ ...discountData, percent: e.target.value })
					}
				/>
				
				<TextField
					name = "code"
					label = "Discount Code"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {discountData.code}
					onChange = {
						(e) => setDiscountData({ ...discountData, code: e.target.value })
					}
				/>
				
				<TextField
					name = "expiration"
					label = "Expiration Date (YYYY-MM-DD)"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {discountData.expiration}
					onChange = {
						(e) => setDiscountData({ ...discountData, expiration: e.target.value })
					}
				/>
				
				<TextField
					name = "products"
					label = "Valid Products (Comma separated. Leave blank for global discount)"
					variant = "outlined"
					fullWidth
					margin = "dense"
					value = {discountData.productIds}
					onChange = {
						(e) => setDiscountData({ ...discountData, productIds: e.target.value.split(',') })
					}
				/>
				
				<Stack
					direction = "row"
					justifyContent = "center"
					alignItems = "center"
					spacing = {2}
					marginTop = "35px"
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
					Discount successfully created.
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
					Error creating discount.
				</Alert>
			</Collapse>
		</Container>
	);
}