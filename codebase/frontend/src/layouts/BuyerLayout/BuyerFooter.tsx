import {
	Box,
	Grid,
	Stack,
	Typography,
	useTheme,
	Link,
	IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Facebook, YouTube, Twitter, Instagram } from "@mui/icons-material";
import { NavLinkItem } from "../../types";

type BuyerFooterSectionProps = {
	title: string;
	items: NavLinkItem[];
	width: string;
};

// TODO: Fix issues on lower screen widths

const BuyerFooterSection = ({
	title,
	items,
	width,
}: BuyerFooterSectionProps) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				width: width,
				height: "12rem",
				padding: "2rem",
			}}
		>
			<Grid container>
				<Grid item xs={12} marginBottom="1rem">
					<Typography color={theme.palette.grey[200]} fontWeight={600}>
						{title}
					</Typography>
				</Grid>
				{items.map((item, idx) => (
					<Grid item key={idx} xs={6} marginY="0.25rem">
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
	);
};

const BuyerFooter = () => {
	const theme = useTheme();
	const navigate = useNavigate();

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

	return (
		<Stack
			direction="row"
			sx={{
				backgroundColor: theme.palette.grey[900],
				height: "16rem",
				width: "100%",
				color: theme.palette.grey[400],
				fontSize: "0.85rem",
			}}
		>
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
						color: theme.palette.primary.main,
						fontSize: "4rem",
						fontWeight: "600",
						fontFamily: "Righteous",
					}}
				>
					Sages
				</Typography>
			</Box>
			<BuyerFooterSection
				title="Shop with Us"
				items={shopWithUsLinks}
				width="50%"
			/>
			<BuyerFooterSection title="Company" items={companyLinks} width="25%" />
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
							{[<Facebook />, <Instagram />, <Twitter />, <YouTube />].map(
								(icon, idx) => (
									<IconButton
										key={idx}
										size="large"
										sx={{ color: theme.palette.grey[400] }}
										onClick={() => navigate("/")}
									>
										{icon}
									</IconButton>
								)
							)}
						</Stack>
					</Grid>
					<Grid item xs={12}>
						<Typography fontSize="0.85rem" align="right">
							17th Floor, One Galle Face Mall
							<br />
							Kelaniya, Colombo
							<br />
							Western Province, Sri Lanka
						</Typography>
					</Grid>
					<Grid item xs={12} marginTop="1rem">
						<Typography fontSize="0.85rem" align="right">
							Copyright © Sages INC 2023
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</Stack>
	);
};

export default BuyerFooter;
