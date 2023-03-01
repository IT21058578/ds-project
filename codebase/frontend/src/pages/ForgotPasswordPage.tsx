import { useState } from "react";

import {
	Box,
	Paper,
	TextField,
	Typography,
	Grid,
	Button,
	Link,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import FormTextField from "../components/FormTextField";

const forgotPasswordSchema = yup.object({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please enter your email"),
});

type Props = {};

const ForgotPasswordPage = (props: Props) => {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({ resolver: yupResolver(forgotPasswordSchema) });
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => {
		setIsRequestLoading(true);
	};

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Paper elevation={3}>
				<Box
					sx={{
						minWidth: "18rem",
						marginX: "4rem",
						marginY: "3rem",
						maxWidth: "18rem",
					}}
				>
					<Grid container direction="column">
						<Grid item xs={12} textAlign="center" marginBottom="3rem">
							<Typography variant="h6">Forgot your Password</Typography>
						</Grid>
						<Grid item xs={12} textAlign="left" marginBottom="2rem">
							<Typography>
								Enter the password you used while making your account. We will
								send you an email with a link to reset your password
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid item xs={12} textAlign="center" marginBottom="2rem">
									<FormTextField
										error={errors.email}
										{...register("email")}
										isLoading={isSubmitting || isRequestLoading}
									/>
								</Grid>
								<Grid item xs={12} marginBottom="0.5rem" textAlign="center">
									<SubmitButton
										isLoading={isSubmitting || isRequestLoading}
										normalText={"Send Email"}
										loadingText={"Sending Email..."}
									/>
								</Grid>
								<Grid item xs={12} textAlign="center">
									<Typography variant="caption">
										Don't have an account yet?{" "}
									</Typography>
									<Link
										onClick={() => navigate("/register")}
										variant="caption"
										underline="hover"
									>
										Sign up!
									</Link>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default ForgotPasswordPage;
