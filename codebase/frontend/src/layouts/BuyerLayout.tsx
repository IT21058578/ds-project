import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import BuyerFooter from "./BuyerLayout/BuyerFooter";
import BuyerNavBar from "./BuyerLayout/BuyerNavBar";

type Props = {};

const BuyerLayout = (props: Props) => {
	return (
		<>
			<Stack
				justifyContent="space-between"
				direction="column"
				alignItems="center"
				sx={{ minHeight: "100vh" }}
			>
				<BuyerNavBar />
				<Box
					sx={{
						marginY: "4rem",
						justifyContent: "center",
					}}
				>
					<Outlet />
				</Box>
				<BuyerFooter />
			</Stack>
		</>
	);
};

export default BuyerLayout;
