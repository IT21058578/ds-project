import React, { useState } from "react";
import {
	Box,
	Grid,
	Avatar,
	Typography,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Tab,
} from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { green } from "@mui/material/colors";
import { keyframes } from "@mui/styled-engine";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../store/hooks";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedTypography = styled(Typography)`
	animation: ${fadeIn} 1s ease-in-out;
	transition: all 0.2s ease-in-out;

	&:hover {
		animation-name: ${keyframes`
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `};
	}
`;

const Profile: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [openEditAvatarDialog, setOpenEditAvatarDialog] = useState(false);
	const [openEditEmailDialog, setOpenEditEmailDialog] = useState(false);
	const [openEditNameDialog, setOpenEditNameDialog] = useState(false);
	const [editedEmail, setEditedEmail] = useState(user?.email ?? "");
	const [editedFirstName, setEditedFirstName] = useState(user?.firstName ?? "");
	const [editedLastName, setEditedLastName] = useState(user?.lastName ?? "");
	const avatarUrl = "";

	if (user === undefined) return <></>;

	const { email, firstName, lastName } = user;

	const handleEditAvatar = () => {
		// TODO: implement functionality to edit avatar
	};

	const handleEditEmail = () => {
		// TODO: implement functionality to edit email
	};

	const handleEditAddress = () => {
		// TODO: implement functionality to edit address
	};

	const handleEditName = () => {
		// TODO: implement functionality to edit first and last name
	};

	return (
		<Box sx={{ p: 4 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={4}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<Avatar
							alt={`${firstName} ${lastName}`}
							src={avatarUrl}
							sx={{ width: 228, height: 228, cursor: "pointer" }}
							onClick={() => setOpenEditAvatarDialog(true)}
						/>
						<IconButton
							aria-label="edit avatar"
							sx={{
								position: "absolute",
								bottom: 0,
								right: 0,
								bgcolor: "background.paper",
							}}
							onClick={() => setOpenEditAvatarDialog(true)}
						>
							<AppRegistrationIcon />
						</IconButton>
					</Box>
				</Grid>

				<Box
					sx={{
						minWidth: 75,
						border: "1px solid white",
						padding: "70px",
						borderRadius: "30px",
						marginLeft: "30px",
						boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
					}}
				>
					<Grid item xs={12} md={8}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								height: "100%",
							}}
						>
							<AnimatedTypography
								variant="h4"
								color="primary"
								gutterBottom
								fontWeight="bolt"
							>
								{firstName} {lastName}
							</AnimatedTypography>
							<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
								<Typography variant="subtitle1" sx={{ mr: 2 }}>
									Email:
								</Typography>
								<Typography variant="body1" sx={{ minWidth: "200px" }}>
									{email}
								</Typography>
								{/* <IconButton aria-label="edit email" sx={{ ml: 1 }} onClick={() => setOpenEditEmailDialog(true)}>
                <AppRegistrationIcon />
              </IconButton> */}
							</Box>
							<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
								<Typography variant="subtitle1" sx={{ mr: 2 }}>
									Name:
								</Typography>
								<Typography variant="body1" sx={{ minWidth: "215px" }}>
									{firstName} {lastName}
								</Typography>
								<IconButton
									aria-label="edit name"
									sx={{ ml: 1 }}
									onClick={() => setOpenEditNameDialog(true)}
								>
									<AppRegistrationIcon />
								</IconButton>
							</Box>
						</Box>
					</Grid>
				</Box>
			</Grid>

			{/* Edit Avatar Dialog */}
			<Dialog
				open={openEditAvatarDialog}
				onClose={() => setOpenEditAvatarDialog(false)}
			>
				<DialogTitle>Edit Avatar</DialogTitle>
				<DialogContent>
					{/* TODO: add form to edit avatar */}
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Avatar
							alt={`${firstName} ${lastName}`}
							src={avatarUrl}
							sx={{ width: 228, height: 228, cursor: "pointer" }}
							onClick={handleEditAvatar}
						/>
					</Box>
				</DialogContent>
			</Dialog>

			{/* Edit Email Dialog */}
			<Dialog
				open={openEditEmailDialog}
				onClose={() => setOpenEditEmailDialog(false)}
			>
				<DialogTitle>Edit Email</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						label="Email"
						value={editedEmail}
						onChange={(e) => setEditedEmail(e.target.value)}
						margin="normal"
						variant="outlined"
					/>
					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
						<Button
							color="secondary"
							variant="text"
							onClick={() => setOpenEditEmailDialog(false)}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={handleEditEmail}
							sx={{ ml: 2 }}
						>
							Save
						</Button>
					</Box>
				</DialogContent>
			</Dialog>

			{/* Edit Name Dialog */}
			<Dialog
				open={openEditNameDialog}
				onClose={() => setOpenEditNameDialog(false)}
			>
				<DialogTitle>Edit Name</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						label="First Name"
						value={editedFirstName}
						onChange={(e) => setEditedFirstName(e.target.value)}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Last Name"
						value={editedLastName}
						onChange={(e) => setEditedLastName(e.target.value)}
						margin="normal"
						variant="outlined"
					/>
					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
						<Button
							color="secondary"
							variant="text"
							onClick={() => setOpenEditNameDialog(false)}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={handleEditName}
							sx={{ ml: 2 }}
						>
							Save
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
};

// Example usage
const dummyData = {
	firstName: "Nilan",
	lastName: "Malathunga",
	email: "nilan@gmail.com",
	address1: "131/8,kibulawala",
	address2: "Kalalgoda",
	avatarUrl: "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png",
};

function ProfilePage() {
	return (
		<Box
			sx={{
				minWidth: 975,
				border: "1px solid green",
				padding: "70px",
				borderRadius: "30px",
				backgroundColor: "rgba(234, 234, 234, 0.1)",
				marginTop: "100px",
				marginBottom: "20px",
				boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
			}}
		>
			<div style={{ display: "flex", justifyContent: "center", color: "gray" }}>
				<Typography variant="h4" sx={{ color: "green" }} gutterBottom>
					<AccountCircleOutlinedIcon />
					Your Profile
				</Typography>
			</div>
			<Box
				sx={{
					minWidth: 775,
					border: "1px solid white",
					padding: "40px",
					borderRadius: "30px",
					backgroundColor: "rgba(234, 234, 234, 0.1)",
					boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.25)",
				}}
			>
				<div className="App">
					<Profile />
				</div>
			</Box>
		</Box>
	);
}

export default ProfilePage;
