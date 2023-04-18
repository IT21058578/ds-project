import { Check, CheckCircle } from "@mui/icons-material";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import RegisterForm from "./RegisterPage/RegisterForm";

const RegisterPage = () => {
	const [isRegisterSuccessful, setIsRegisterSuccessful] =
		useState<boolean>(false);
	const theme = useTheme();

	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Paper elevation={3}>
				<Box
					sx={{
						width: "26rem",
						marginX: "4rem",
						marginY: "3rem",
					}}
				>
					<Grid container direction="column">
						{isRegisterSuccessful ? (
							<>
								<Grid item xs={12} textAlign="center" marginBottom="1rem">
									<Typography variant="h6">Registration Successful!</Typography>
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
								<Grid item xs={12}>
									<Typography>
										You will receive an email with a link to authorize your
										account at the email provided
									</Typography>
								</Grid>
							</>
						) : (
							<>
								<Grid item xs={12} textAlign="center" marginBottom="3rem">
									<Typography variant="h6">Create a new account</Typography>
								</Grid>
								<Grid item xs={12}>
									<RegisterForm
										setIsRegisterSuccessful={setIsRegisterSuccessful}
									/>
								</Grid>
							</>
						)}
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default RegisterPage;
