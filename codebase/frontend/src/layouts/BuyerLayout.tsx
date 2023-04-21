import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import BuyerFooter from "./BuyerLayout/BuyerFooter";
import BuyerNavBar from "./BuyerLayout/BuyerNavBar";
<<<<<<<<< Temporary merge branch 1

type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {
=========
type Props = { children?: React.ReactNode };

const BuyerLayout = ({ children }: Props) => {

>>>>>>>>> Temporary merge branch 2
	return (
		<Stack
			justifyContent="space-between"
			direction="column"
			alignItems="center"
<<<<<<<<< Temporary merge branch 1
			sx={{ height: "100vh" }}
		>
			<BuyerNavBar />
			<Box
=========
			sx={{ height: "auto" }}
		>
			<BuyerNavBar />
			<Box 
>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
=========

>>>>>>>>> Temporary merge branch 2
	);
};

export default BuyerLayout;
