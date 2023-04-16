import React, {useState} from "react";
import {Paper, Stack, Button, Box} from "@mui/material";

import CreateItems from './ToolPanels/CreateItems';

const AdminPanel = () => {
	
	const [activePanel, setActivePanel] = useState("create_items");
	
	const updateActivePanel = (panelName) => {
		setActivePanel(panelName);
	}

    return (

        <Paper sx={{
			paddingBottom: '10px'
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
					variant = { (activePanel == "create_items") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_items") }
				>
					Create Item
				</Button>
				
				<Button
					variant = { (activePanel == "modify_items") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("modify_items") }
				>
					Modify Item
				</Button>
				
				<Button
					variant = { (activePanel == "create_discount") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_discount") }
				>
					Create Discount
				</Button>
				
				<Button
					variant = { (activePanel == "create_sale") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("create_sale") }
				>
					Create Sale
				</Button>
				
				<Button
					variant = { (activePanel == "modify_users") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("modify_users") }
				>
					Modify User
				</Button>
				
				<Button
					variant = { (activePanel == "show_current_orders") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("show_current_orders") }
				>
					Current Order
				</Button>
				
				<Button
					variant = { (activePanel == "show_order_history") ? "contained" : "outlined" }
					onClick = { () => updateActivePanel("show_order_history") }
				>
					Order History
				</Button>
				
			</Stack>
			
			<Box
				display={(activePanel === "create_items") ? "block" : "none"}
			>
				<CreateItems/>
			</Box>
			
        </Paper>
    );
};

export default AdminPanel;