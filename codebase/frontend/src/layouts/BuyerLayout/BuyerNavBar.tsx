import React, { useState } from "react";

import {
	Box,
	Toolbar,
	IconButton,
	Button,
	Paper,
	useTheme,
	Drawer,
} from "@mui/material";

import {
	AccountCircle,
	LocalShipping,
	People,
	Reviews,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import { ShoppingCart, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { NavLinkItem } from "../../types";
import { useAppSelector } from "../../store/hooks";
import LogoutDialog from "../../components/LogoutDialog";

//drawer
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Badge, { BadgeProps } from "@mui/material/Badge";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
		//   border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}));

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const BuyerNavBar = () => {
	const navigate = useNavigate();
	const {
		palette: { grey },
	} = useTheme();
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const [hoveredNavItem, setHoveredNavItem] = useState<string | undefined>();
	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);

	const user = useAppSelector((state) => state.auth.user);

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
						{!!user ? (
							<>
								<IconButton
									size="large"
									sx={{ color: grey[900] }}
									onClick={() => navigate("/cart")}
								>
									<ShoppingCart />
								</IconButton>
								<IconButton
									size="large"
									sx={{ color: grey[900] }}
									onClick={() => navigate("/user")}
								>
									<AccountCircle />
								</IconButton>
								<IconButton
									size="large"
									sx={{ color: grey[900] }}
									onClick={() => setIsLogoutDialogOpen(true)}
								>
									<Logout />
								</IconButton>
							</>
						) : (
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
						)}
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
			<LogoutDialog
				open={isLogoutDialogOpen}
				onClose={() => setIsLogoutDialogOpen(false)}
			/>
		</>
	);
};

export default BuyerNavBar;
