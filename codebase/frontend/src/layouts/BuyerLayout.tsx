import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import BuyerFooter from "./BuyerLayout/BuyerFooter";
import BuyerNavBar from "./BuyerLayout/BuyerNavBar";
import { Style } from "@mui/icons-material";

type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {
	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			alignItems="center"
			sx={{ height: "100vh" }}
			style={{backgroundColor:'rgb(244 244 245)'}}
		>
			<Box
			sx={{ height: "auto" }}
			style={{backgroundColor:'rgb(244 244 245)'}}
		    >
			<BuyerNavBar />
			<Box 

				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "92vh",
				}}
			>
				{children}
				<Outlet />
			</Box>
			</Box>
			<BuyerFooter />
		</Stack>
	);
	
};

export default BuyerLayout;
