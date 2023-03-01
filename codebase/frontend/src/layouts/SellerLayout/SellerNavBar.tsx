import { useState } from "react";

import {
	Avatar,
	Box,
	Divider,
	IconButton,
	Paper,
	Typography,
	useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import {
	Dashboard,
	LocalShipping,
	People,
	Reviews,
	Inventory,
	Storefront,
	Settings,
	Menu,
	Logout,
} from "@mui/icons-material";

import NavButton from "../../components/NavButton";

import { NavLinkItemWithIcon } from "../../constants/types";

type Props = {};

const SellerNavBar = (props: Props) => {
	const {
		typography: { fontFamily },
		palette: {
			grey,
			primary: { main: primary },
		},
	} = useTheme();
	const [isCollapsed, setIsCollapsed] = useState<boolean>();

	const navBarLinks: NavLinkItemWithIcon[] = [
		{ label: "Dashboard", icon: <Dashboard />, link: "/" },
		{ label: "Products", icon: <Inventory />, link: "/products" },
		{ label: "Sellers", icon: <Storefront />, link: "/sellers" },
		{ label: "Orders", icon: <LocalShipping />, link: "/orders" },
		{ label: "Reviews", icon: <Reviews />, link: "/reviews" },
		{ label: "Customers", icon: <People />, link: "/customers" },
	];

	const miscLinks: NavLinkItemWithIcon[] = [
		{ label: "Settings", icon: <Settings />, link: "/settings" },
	];

	return (
		<Paper sx={{ height: "100vh" }} elevation={3}>
			<Stack
				sx={{
					backgroundColor: grey[100],
					height: "100%",
					color: grey[900],
					width: isCollapsed ? "4rem" : "16rem",
				}}
			>
				<Typography
					sx={{
						height: "fit-content",
						color: grey[900],
						backgroundColor: primary,
						fontSize: "2rem",
						fontWeight: "600",
						fontFamily: "Righteous",
						textAlign: "center",
						paddingY: isCollapsed ? "1.25rem" : "1rem",
						paddingX: isCollapsed ? "0.75rem" : "3rem",
						marginBottom: "1rem",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{!isCollapsed && "Sages"}
					<IconButton onClick={() => setIsCollapsed((prev) => !prev)}>
						<Menu />
					</IconButton>
				</Typography>
				<Box>
					<Stack
						sx={{
							paddingTop: isCollapsed ? "0.89rem" : "0.75rem",
							paddingX: isCollapsed ? "0.85rem" : "1rem",
							marginBottom: isCollapsed ? "1.1rem" : "1rem",
							alignItems: "center",
							justifyContent: "space-between",
						}}
						direction="row"
					>
						<Avatar
							variant="rounded"
							sx={{ width: "2.25rem", height: "2.25rem" }}
						>
							TG
						</Avatar>
						{!isCollapsed && (
							<>
								<Stack>
									<Typography
										sx={{ paddingLeft: "0.5rem" }}
										fontSize="0.8rem"
										fontWeight="600"
									>
										Tharindu Gunasekera
									</Typography>
									<Typography sx={{ paddingLeft: "0.5rem" }} fontSize="0.8rem">
										Administrator
									</Typography>
								</Stack>
								<IconButton>
									<Logout />
								</IconButton>
							</>
						)}
					</Stack>
				</Box>
				<Divider sx={{ marginY: "0.5rem" }} />
				{navBarLinks.map((item, idx) => (
					<NavButton navLinkItem={item} isCollapsed={isCollapsed} key={idx} />
				))}
				<Divider sx={{ marginY: "0.5rem" }} />

				<Box flexGrow={1} />
				<Divider sx={{ marginY: "0.5rem" }} />
				{!isCollapsed && (
					<Typography
						sx={{ paddingBottom: "1rem", paddingX: "2.25rem" }}
						fontSize="0.8rem"
					>
						Copyright © Sages INC 2023
					</Typography>
				)}
			</Stack>
		</Paper>
	);
};

export default SellerNavBar;
