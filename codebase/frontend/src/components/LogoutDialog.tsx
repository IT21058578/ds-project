import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../store/apis/auth-api-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeAuth } from "../store/slices/auth-slice";
import SubmitButton from "./SubmitButton";

type Props = {
	open: boolean;
	onClose: () => void;
};

const LogoutDialog = ({ open, onClose }: Props) => {
	const userId = useAppSelector((state) => state.auth.user?.id);
	const [logoutUser, { isLoading }] = useUserLogoutMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	/**
	 * When the logout is confirmed. This makes a call to the backend API to delete
	 * the user's token family and also delete the auth state in the store
	 */
	const logoutHandler = async () => {
		console.log("Logging out...");
		try {
			await logoutUser({ id: userId || "" });
			dispatch(removeAuth());
			onClose();
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Dialog open={open || false} onClose={onClose}>
			<DialogTitle>
				<Typography variant="h6">Are you sure?</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography>
					Are you sure you want to log out? Your cart will be saved for later
					use
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<SubmitButton
					isLoading={isLoading}
					normalText="Logout"
					loadingText="Logging out..."
					onClick={logoutHandler}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default LogoutDialog;
