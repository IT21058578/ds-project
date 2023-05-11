import { useEffect, useState } from "react";

import { Box, Paper, Typography, Grid, Link } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import SubmitButton from "../components/SubmitButton";
import FormTextField from "../components/FormTextField";
import { useResetPasswordMutation } from "../store/apis/auth-api-slice";
import PasswordFormTextField from "../components/PasswordFormTextField";

const resetPasswordSchema = yup.object({
	password: yup.string().required("Please enter your password"),
	matchPassword: yup.string().required("Please re-enter your password"),
});

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({ resolver: yupResolver(resetPasswordSchema) });
	const [resetPassword, { isLoading }] = useResetPasswordMutation();
	const { resetToken } = useParams();

	useEffect(() => {
		// If authorizationToken is not valid, navigate
	}, [resetToken]);

	const onSubmit = async (data: FieldValues) => {
		try {
			await resetPassword({
				password: data.password,
				resetToken: resetToken || "",
			});
		} catch (error) {
			console.error(error);
		}
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
							<Typography variant="h6">Change your password</Typography>
						</Grid>
						<Grid item xs={12} textAlign="left" marginBottom="2rem">
							<Typography>
								Enter the new password you want to use with your account and
								submit.
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Grid item xs={12} textAlign="center" marginBottom="2rem">
									<PasswordFormTextField
										{...register("password")}
										error={errors.password}
										isLoading={isSubmitting || isLoading}
									/>
								</Grid>
								<Grid item xs={12} textAlign="center" marginBottom="2rem">
									<FormTextField
										{...register("matchPassword")}
										error={errors.matchPassword}
										isLoading={isSubmitting || isLoading}
									/>
								</Grid>
								<Grid item xs={12} marginBottom="0.5rem" textAlign="center">
									<SubmitButton
										isLoading={isSubmitting || isLoading}
										normalText={"Send Email"}
										loadingText={"Sending Email..."}
									/>
								</Grid>
								<Grid item xs={12} textAlign="center">
									<Typography variant="caption">
										Remembered your password?{" "}
									</Typography>
									<Link
										onClick={() => navigate("/login")}
										variant="caption"
										underline="hover"
									>
										Login!
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

export default ResetPasswordPage;
