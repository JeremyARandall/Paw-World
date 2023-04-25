import React, {useState} from "react";
import {Paper, Stack, Button, Box} from "@mui/material";

import CreateProduct from './ToolPanels/CreateProduct';
import ModifyProduct from './ToolPanels/ModifyProduct';
import CreateDiscountCode from './ToolPanels/CreateDiscountCode';
import ModifyUser from './ToolPanels/ModifyUser';
import CurrentOrders from './ToolPanels/CurrentOrders';
import OrderHistory from './ToolPanels/OrderHistory';



const AdminPanel = () => {

	const [activePanel, setActivePanel] = useState("create_products");

	const updateActivePanel = (panelName) => {
		setActivePanel(panelName);
	}

	return (

		<Paper sx={{
			paddingBottom: '10px',
			minHeight: '39vw'
		}}>

			<Stack
				direction = "row"
				justifyContent = "center"
				alignItems = "center"
				spacing = {2}
				marginTop = "30px"
				marginBottom = "30px"
			>

				<Button
					variant = { (activePanel === "create_products") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_products") }
				>
					Create Product
				</Button>

				<Button
					variant = { (activePanel === "modify_products") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("modify_products") }
				>
					Modify Product
				</Button>

				<Button
					variant = { (activePanel === "create_discount_code") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_discount_code") }
				>
					Create Discount Code
				</Button>

				<Button
					variant = { (activePanel === "modify_users") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("modify_users") }
				>
					Modify User
				</Button>

				<Button
					variant = { (activePanel === "current_orders") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("current_orders") }
				>
					Current Orders
				</Button>

				<Button
					variant = { (activePanel === "order_history") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("order_history") }
				>
					Order History
				</Button>

			</Stack>

			<Box
				display={(activePanel === "create_products") ? "block" : "none"}
			>
				<CreateProduct/>
			</Box>
			
			<Box
				display={(activePanel === "modify_products") ? "block" : "none"}
			>
				<ModifyProduct/>
			</Box>
			
			<Box
				display={(activePanel === "create_discount_code") ? "block" : "none"}
			>
				<CreateDiscountCode/>
			</Box>
			
			<Box
				display={(activePanel === "modify_users") ? "block" : "none"}
			>
				<ModifyUser/>
			</Box>
			
			<Box
				display={(activePanel === "current_orders") ? "block" : "none"}
			>
				<CurrentOrders/>
			</Box>
			
			<Box
				display={(activePanel === "order_history") ? "block" : "none"}
			>
				<OrderHistory/>
			</Box>

		</Paper>
	);
};

export default AdminPanel;