import {
	AppBar,
	Box,
	Container,
	Toolbar,
	IconButton,
	Button,
	Paper,
	Collapse,
	Backdrop,
	useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const navLinks = ["Products", "Brands"];

const BuyerNavBar = (props: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [hoveredNavItem, setHoveredNavItem] = useState<string | undefined>();

	return (
		<AppBar position="relative" elevation={2}>
			<Toolbar>
				<Button onClick={() => navigate("/")}>
					<Typography
						sx={{
							color: theme.palette.grey[900],
							fontSize: "2rem",
							fontWeight: "600",
							fontFamily: "Righteous",
						}}
					>
						Sages
					</Typography>
				</Button>
				<Box sx={{ flexGrow: 1, textAlign: "center" }}>
					{navLinks.map((link, idx) => (
						<Button
							key={idx}
							sx={{
								color: theme.palette.grey[900],
								fontSize: "1rem",
								fontWeight: "600",
								height: "4rem",
								paddingX: "1rem",
							}}
							onMouseEnter={() => setHoveredNavItem(link)}
							onMouseLeave={() => setHoveredNavItem(undefined)}
						>
							{link}
						</Button>
					))}
				</Box>
				<Box sx={{ textAlign: "end" }}>
					<IconButton size="large" sx={{ color: theme.palette.grey[900] }}>
						<ShoppingCartIcon />
					</IconButton>
					<IconButton size="large" sx={{ color: theme.palette.grey[900] }}>
						<AccountCircleIcon />
					</IconButton>
					<Button
						onClick={() => navigate("login")}
						sx={{
							color: theme.palette.grey[900],
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
	);
	{
		/* <Box>
	<Collapse
		in={hoveredNavItem === "Products"}
		onMouseEnter={() => setHoveredNavItem("Products")}
		onMouseLeave={() => setHoveredNavItem(undefined)}
		mountOnEnter
		unmountOnExit
	>
		<Paper elevation={1} square>
			Products
		</Paper>
	</Collapse>
</Box> */
	}
};

export default BuyerNavBar;
