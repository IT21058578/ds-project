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
import Badge, { BadgeProps } from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		right: -3,
		top: 13,
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

	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);

	const user = useAppSelector((state) => state.auth.user);

	return (
		<>
			<AppBar position="fixed" open={open} elevation={2} sx={{ zIndex: 3000 }}>
				<Toolbar>
					{user !== undefined && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{ mr: 2, ...(open && { display: "none" }) }}
						>
							<MenuIcon />
						</IconButton>
					)}
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
					<Box sx={{ flexGrow: 1, textAlign: "center" }} />
					<Box sx={{ textAlign: "end" }}>
						{user !== undefined ? (
							<>
								<IconButton
									size="large"
									sx={{ color: grey[900] }}
									onClick={() => navigate("/cart")}
								>
									<ShoppingCart />
								</IconButton>
								<Chip
									onClick={() => navigate("/profilepage")}
									avatar={
										<Avatar
											alt="Natacha"
											src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png"
										/>
									}
									label={`Hi ${user.lastName}!`}
									variant="outlined"
									sx={{
										background: "white",
										color: "green",
										marginLeft: "10px",
									}}
								/>
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
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
						backgroundColor: "rgba(246, 246, 246, 0.85)",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>

				<Divider />
				<List>
					{["Profile"].map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => navigate("/ProfilePage")}>
								<ListItemIcon>
									<People />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["Orders"].map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => navigate("/order")}>
								<ListItemIcon>
									<LocalShipping />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["Reviews"].map((text) => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => navigate("/reviewtable")}>
								<ListItemIcon>
									<Reviews />
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<LogoutDialog
				open={isLogoutDialogOpen}
				onClose={() => setIsLogoutDialogOpen(false)}
			/>
		</>
	);
};

export default BuyerNavBar;
