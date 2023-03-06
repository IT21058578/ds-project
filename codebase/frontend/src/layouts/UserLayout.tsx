import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserNavBar from "./UserLayout/UserNavBar";

type Props = { children?: React.ReactNode };

const UserLayout = ({ children }: Props) => {
	return (
		<Stack sx={{ height: "100%", width: "98.75vw" }} direction="row">
			<UserNavBar />
			<Box
				flexGrow={1}
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{children}
				<Outlet />
			</Box>
		</Stack>
	);
};

export default UserLayout;
