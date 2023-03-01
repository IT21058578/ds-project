import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import BuyerFooter from "./BuyerLayout/BuyerFooter";
import BuyerNavBar from "./BuyerLayout/BuyerNavBar";

type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {
	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			alignItems="center"
			sx={{ height: "100vh" }}
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
			<BuyerFooter />
		</Stack>
	);
};

export default BuyerLayout;
