import { useState } from "react";

import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Button,
	Paper,
	useTheme,
	Drawer,
} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import { NavLinkItem } from "../../constants/types";

type Props = {};
const BuyerNavBar = (props: Props) => {
	const navigate = useNavigate();
	const {
		palette: { grey },
	} = useTheme();
	const [hoveredNavItem, setHoveredNavItem] = useState<string | undefined>();

	const drawerItems: (NavLinkItem & { content?: React.ReactNode })[] = [
		{ label: "Products", content: "Products bruh moment" },
		{ label: "Brands", content: "Brands bruh moment" },
	];

	return (
		<>
			<AppBar position="sticky" elevation={2} sx={{ zIndex: 3000 }}>
				<Toolbar>
					<Button onClick={() => navigate("/")}>
						<Typography
							sx={{
								color: grey[900],
								fontSize: "2rem",
								fontWeight: "600",
								fontFamily: "Righteous",
							}}
						>
							Sages
						</Typography>
					</Button>
					<Box sx={{ flexGrow: 1, textAlign: "center" }}>
						{drawerItems.map(({ link, label }, idx) => (
							<Button
								key={idx}
								sx={{
									color: grey[900],
									fontSize: "1rem",
									fontWeight: "600",
									height: "4rem",
									paddingX: "1rem",
								}}
								onMouseEnter={() => setHoveredNavItem(label)}
								onMouseLeave={() => setHoveredNavItem(undefined)}
							>
								{label}
							</Button>
						))}
					</Box>
					<Box sx={{ textAlign: "end" }}>
						<IconButton
							size="large"
							sx={{ color: grey[900] }}
							onClick={() => navigate("/cart")}
						>
							<ShoppingCartIcon />
						</IconButton>
						<IconButton
							size="large"
							sx={{ color: grey[900] }}
							onClick={() => navigate("/user")}
						>
							<AccountCircleIcon />
						</IconButton>
						<Button
							onClick={() => navigate("login")}
							sx={{
								color: grey[900],
								fontSize: "1rem",
								fontWeight: "600",
								height: "4rem",
								paddingX: "1rem",
							}}
						>
							Login
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer anchor="top" open={!!hoveredNavItem} disableScrollLock>
				<div style={{ height: "4rem" }} />
				<Paper
					color={grey[100]}
					sx={{ width: "100%", height: "60vh" }}
					onMouseEnter={() => setHoveredNavItem(hoveredNavItem)}
					onMouseLeave={() => setHoveredNavItem(undefined)}
				>
					<Box sx={{ padding: "2rem" }}>
						{drawerItems.find((item) => item.label === hoveredNavItem)?.content}
					</Box>
				</Paper>
			</Drawer>
		</>
	);
};

export default BuyerNavBar;
