<<<<<<<<< Temporary merge branch 1
import { useState } from "react";

import {
	AppBar,
=========
import React from "react";
import { useState } from "react";

import {
>>>>>>>>> Temporary merge branch 2
	Box,
	Toolbar,
	IconButton,
	Button,
	Paper,
	useTheme,
	Drawer,
} from "@mui/material";
<<<<<<<<< Temporary merge branch 1
import Typography from "@mui/material/Typography/Typography";
import { ShoppingCart, AccountCircle, Logout } from "@mui/icons-material";
=========

import {
	LocalShipping,
	People,
	Reviews,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import { ShoppingCart,Logout } from "@mui/icons-material";
>>>>>>>>> Temporary merge branch 2
import { useNavigate } from "react-router-dom";

import { NavLinkItem } from "../../types";
import { useAppSelector } from "../../store/hooks";
import LogoutDialog from "../../components/LogoutDialog";

<<<<<<<<< Temporary merge branch 1
=========
//drawer
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Badge, { BadgeProps } from '@mui/material/Badge';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
	  right: -3,
	  top: 13,
	//   border: `2px solid ${theme.palette.background.paper}`,
	  padding: '0 4px',
	},
  }));


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
  }

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
	  width: `calc(100% - ${drawerWidth}px)`,
	  marginLeft: `${drawerWidth}px`,
	  transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
  }));
  
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
  

>>>>>>>>> Temporary merge branch 2
const BuyerNavBar = () => {
	const navigate = useNavigate();
	const {
		palette: { grey },
	} = useTheme();
<<<<<<<<< Temporary merge branch 1
=========
	const theme = useTheme();

	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
>>>>>>>>> Temporary merge branch 2

	const [hoveredNavItem, setHoveredNavItem] = useState<string | undefined>();
	const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState<boolean>(false);

	const user = useAppSelector((state) => state.auth.user);

	const drawerItems: (NavLinkItem & { content?: React.ReactNode })[] = [
		{ label: "Products", content: "Products bruh moment" },
		{ label: "Brands", content: "Brands bruh moment" },
	];

	return (
		<>
<<<<<<<<< Temporary merge branch 1
			<AppBar position="sticky" elevation={2} sx={{ zIndex: 3000 }}>
				<Toolbar>
					<Button onClick={() => navigate("/")}>
=========
			<AppBar position="fixed" open={open}>
				<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{ mr: 2, ...(open && { display: 'none' }) }}
				>
					<MenuIcon />
				</IconButton>
					<Button onClick={() => navigate("/home")}>
>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
						{!!user ? (
=========
						 (
>>>>>>>>> Temporary merge branch 2
							<>
								<IconButton
									size="large"
									sx={{ color: grey[900] }}
									onClick={() => navigate("/cart")}
<<<<<<<<< Temporary merge branch 1
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
=========
									
								>
									<StyledBadge badgeContent={4} color="warning">
									<ShoppingCart />
									</StyledBadge>
								</IconButton>
								
>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
						)}
					</Box>
				</Toolbar>
			</AppBar>
=========
						)
					</Box>
				</Toolbar>
			</AppBar>

			{/* new drawer */}
			<Drawer
				sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					backgroundColor: 'rgba(246, 246, 246, 0.85)',
				},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
				</DrawerHeader>

				<Divider />
				<List>
				{['Profile'].map((text) => (
					<ListItem key={text} disablePadding>
					<ListItemButton
					onClick={() => navigate("/ProfilePage")}>
						<ListItemIcon>
							<People/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
					</ListItem>
				))}
				</List>
				<Divider />
				<List>
				{['Orders'].map((text) => (
					<ListItem key={text} disablePadding>
					<ListItemButton
					onClick={() => navigate("/antdesigngrid")}>
						<ListItemIcon>
							<LocalShipping/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
					</ListItem>
				))}
				</List>
				<Divider />
				<List>
				{['Reviews'].map((text) => (
					<ListItem key={text} disablePadding>
					<ListItemButton
					onClick={() => navigate("/reviewtable")}>
						<ListItemIcon>
							<Reviews/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
					</ListItem>
				))}
				</List>
			</Drawer>


>>>>>>>>> Temporary merge branch 2
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
