import { Box, Divider, Paper, Stack, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { NavLinkItemWithIcon } from "../../constants/types";
import { LocalShipping, Person, Reviews } from "@mui/icons-material";
import NavButton from "../../components/NavButton";

const UserNavBar = () => {
	const {
		palette: { grey },
	} = useTheme();

	const userLinks: NavLinkItemWithIcon[] = [
		{ label: "Personal", icon: <Person />, link: "/user" },
		{ label: "Orders", icon: <LocalShipping />, link: "/user/orders" },
		{ label: "Reviews", icon: <Reviews />, link: "/user/reviews" },
	];

	return (
		<Paper elevation={3}>
			<Stack
				sx={{
					backgroundColor: grey[100],
					height: "100%",
					color: grey[900],
					width: "16rem",
				}}
			>
				<Divider sx={{ marginY: "1rem" }} />
				{userLinks.map((item, idx) => (
					<NavButton navLinkItem={item} key={idx} />
				))}
				<Divider sx={{ marginY: "0.5rem" }} />
			</Stack>
		</Paper>
	);
};

export default UserNavBar;
