import React, {useState} from "react";
import {Paper, Stack, Button, Box} from "@mui/material";

import CreateItems from './ToolPanels/CreateItems';
import ModifyItems from './ToolPanels/ModifyItems';
import CreateDiscountCode from './ToolPanels/CreateDiscountCode';
import CreateSale from './ToolPanels/CreateSale';
import ModifyUsers from './ToolPanels/ModifyUsers';
import CurrentOrders from './ToolPanels/CurrentOrders';
import OrderHistory from './ToolPanels/OrderHistory';



const AdminPanel = () => {

	const [activePanel, setActivePanel] = useState("create_items");

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
					variant = { (activePanel === "create_items") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_items") }
				>
					Create Item
				</Button>

				<Button
					variant = { (activePanel === "modify_items") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("modify_items") }
				>
					Modify Item
				</Button>

				<Button
					variant = { (activePanel === "create_discount_code") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_discount_code") }
				>
					Create Discount Code
				</Button>

				<Button
					variant = { (activePanel === "create_sale") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_sale") }
				>
					Create Sale
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
				display={(activePanel === "create_items") ? "block" : "none"}
			>
				<CreateItems/>
			</Box>
			
			<Box
				display={(activePanel === "modify_items") ? "block" : "none"}
			>
				<ModifyItems/>
			</Box>
			
			<Box
				display={(activePanel === "create_discount_code") ? "block" : "none"}
			>
				<CreateDiscountCode/>
			</Box>
			
			<Box
				display={(activePanel === "create_sale") ? "block" : "none"}
			>
				<CreateSale/>
			</Box>
			
			<Box
				display={(activePanel === "modify_users") ? "block" : "none"}
			>
				<ModifyUsers/>
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