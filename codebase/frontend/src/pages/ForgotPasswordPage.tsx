import { useState } from "react";

import { Box, Paper, Typography, Grid, Link, useTheme } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

import SubmitButton from "../components/SubmitButton";
import FormTextField from "../components/FormTextField";
import { useForgotPasswordMutation } from "../store/apis/auth-api-slice";
import { CheckCircle } from "@mui/icons-material";

const forgotPasswordSchema = yup.object({
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Please enter your email"),
});

const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		getValues,
	} = useForm({ resolver: yupResolver(forgotPasswordSchema) });
	const [forgotPassword, { isLoading, isSuccess: forgotPasswordIsSuccess }] =
		useForgotPasswordMutation();

	const onSubmit = async (data: FieldValues) => {
		try {
			await forgotPassword({ email: data.email });
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
						{forgotPasswordIsSuccess ? (
							<>
								<Grid item xs={12} textAlign="center" marginBottom="1rem">
									<Typography variant="h6">Email Sent</Typography>
								</Grid>
								<Grid item xs={12} textAlign="center" marginBottom="1rem">
									<CheckCircle
										sx={{
											color: theme.palette.success.light,
											width: "6rem",
											height: "6rem",
										}}
									/>
								</Grid>
								<Grid item xs={12} textAlign="center">
									<Typography>
										We have sent you an email at <br />
										<Typography sx={{ fontWeight: "600", paddingY: "1rem" }}>
											{getValues().email || "placeholder@email.com"}
										</Typography>
										Please follow the instructions in the email to reset your
										password
									</Typography>
								</Grid>
							</>
						) : (
							<>
								<Grid item xs={12} textAlign="center" marginBottom="3rem">
									<Typography variant="h6">Forgot your Password</Typography>
								</Grid>
								<Grid item xs={12} textAlign="left" marginBottom="2rem">
									<Typography>
										Enter the password you used while making your account. We
										will send you an email with a link to reset your password
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<form onSubmit={handleSubmit(onSubmit)}>
										<Grid item xs={12} textAlign="center" marginBottom="2rem">
											<FormTextField
												error={errors.email}
												{...register("email")}
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
							</>
						)}
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default ForgotPasswordPage;
