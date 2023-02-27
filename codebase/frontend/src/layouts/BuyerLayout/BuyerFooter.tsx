import {
	Box,
	Button,
	Grid,
	Stack,
	Typography,
	useTheme,
	Link,
	IconButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

type Props = {};
type NavLinkItem = { label: string; link?: string };

const FOOTER_HEIGHT = "16rem";

const shopWithUsLinks: NavLinkItem[] = [
	{ label: "Body Care" },
	{ label: "Face Care" },
	{ label: "Infusions" },
	{ label: "Sleep" },
	{ label: "Bath and Body" },
	{ label: "Essential Oils" },
	{ label: "Cologne" },
	{ label: "Mist Perfumes" },
	{ label: "Natural Butters" },
];

const companyLinks: NavLinkItem[] = [
	{ label: "About Us" },
	{ label: "Contact Us" },
	{ label: "Privacy Policy" },
	{ label: "Terms of Service" },
	{ label: "Sell with Us" },
];

const BuyerFooter = (props: Props) => {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				backgroundColor: theme.palette.grey[900],
				height: "16rem",
				width: "100%",
				color: theme.palette.grey[400],
				fontSize: "0.85rem",
			}}
		>
			<Stack direction="row">
				<Box
					sx={{
						width: "25%",
						height: "16rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						sx={{
							height: "fit-content",
							color: theme.palette.primary.light,
							fontSize: "4rem",
							fontWeight: "600",
							fontFamily: "Righteous",
						}}
					>
						Sages
					</Typography>
				</Box>
				<Box
					sx={{
						width: "50%",
						height: "12rem",
						padding: "2rem",
					}}
				>
					<Grid container>
						<Grid item xs={12} marginBottom="1rem" direction="column">
							<Typography color={theme.palette.grey[200]} fontWeight={600}>
								Shop with us
							</Typography>
						</Grid>
						{shopWithUsLinks.map((item) => (
							<Grid item xs={6} marginY="0.25rem">
								<Link
									onClick={() => navigate(item.link || "")}
									fontFamily={theme.typography.fontFamily}
									component="button"
									color={theme.palette.grey[400]}
									fontSize="0.85rem"
									underline="hover"
								>
									{item.label}
								</Link>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box
					sx={{
						width: "12.5%",
						height: "12rem",
						padding: "2rem",
					}}
				>
					<Grid container>
						<Grid item xs={12} marginBottom="1rem">
							<Typography color={theme.palette.grey[200]} fontWeight={600}>
								Company
							</Typography>
						</Grid>
						{companyLinks?.map((item) => (
							<Grid item xs={12} marginY="0.25rem">
								<Link
									onClick={() => navigate(item.link || "")}
									fontFamily={theme.typography.fontFamily}
									component="button"
									color={theme.palette.grey[400]}
									underline="hover"
								>
									{item.label}
								</Link>
							</Grid>
						))}
					</Grid>
				</Box>
				<Box
					sx={{
						width: "12.5%",
						height: "12rem",
						paddingY: "2rem",
						paddingX: "4rem",
					}}
				>
					<Grid container>
						<Grid item xs={12} marginBottom="1rem">
							<Stack direction="row" justifyContent="flex-end">
								<IconButton
									size="large"
									sx={{ color: theme.palette.grey[400] }}
									onClick={() => navigate("/")}
								>
									<FacebookIcon />
								</IconButton>
								<IconButton
									size="large"
									sx={{ color: theme.palette.grey[400] }}
									onClick={() => navigate("/")}
								>
									<InstagramIcon />
								</IconButton>
								<IconButton
									size="large"
									sx={{ color: theme.palette.grey[400] }}
									onClick={() => navigate("/")}
								>
									<TwitterIcon />
								</IconButton>
								<IconButton
									size="large"
									sx={{ color: theme.palette.grey[400] }}
									onClick={() => navigate("/")}
								>
									<YouTubeIcon />
								</IconButton>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Stack marginLeft="0.75rem">
								<Typography fontSize="0.85rem" align="right">
									17th Floor, One Galle Face Mall
								</Typography>
								<Typography fontSize="0.85rem" align="right">
									Kelaniya, Colombo
								</Typography>
								<Typography fontSize="0.85rem" align="right">
									Western Province, Sri Lanka
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={12} marginTop="1rem">
							<Typography fontSize="0.85rem" align="right">
								Copyright © Sage INC 2023
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Stack>
		</Box>
	);
};

export default BuyerFooter;
