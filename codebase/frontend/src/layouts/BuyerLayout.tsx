import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import BuyerFooter from "./BuyerLayout/BuyerFooter";
import BuyerNavBar from "./BuyerLayout/BuyerNavBar";
<<<<<<< HEAD

type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {
=======
type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {

>>>>>>> origin/DevDisira
	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			alignItems="center"
<<<<<<< HEAD
			sx={{ height: "100vh" }}
		>
			<BuyerNavBar />
			<Box
=======
			sx={{ height: "auto" }}
		>
			<BuyerNavBar />
			<Box 
>>>>>>> origin/DevDisira
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
<<<<<<< HEAD
=======

>>>>>>> origin/DevDisira
	);
};

export default BuyerLayout;
