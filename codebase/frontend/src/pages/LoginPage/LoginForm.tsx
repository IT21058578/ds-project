import { useState } from "react";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

type Props = {};

const loginSchema = yup.object({
	email: yup
		.string()
		.email("Invalid email")
		.required("Please enter your email"),
	password: yup.string().required("Please enter your password"),
});

const LoginForm = (props: Props) => {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({ resolver: yupResolver(loginSchema) });
	const [isPasswordVisisble, setIsPasswordVisible] = useState<boolean>(false);
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => {
		setIsRequestLoading(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<TextField
						{...register("email", { required: "true" })}
						label="Email"
						variant="outlined"
						error={!!errors.email}
						disabled={isSubmitting || isRequestLoading}
						helperText={!!errors.email && errors.email.message?.toString()}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="0.25rem">
					<FormControl fullWidth variant="outlined">
						<InputLabel>Password</InputLabel>
						<OutlinedInput
							fullWidth
							type={isPasswordVisisble ? "text" : "password"}
							error={!!errors.password}
							disabled={isSubmitting || isRequestLoading}
							{...register("password", { required: "true" })}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										onClick={() => setIsPasswordVisible((prev) => !prev)}
									>
										{isPasswordVisisble ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
						<FormHelperText error>
							{!!errors.password && errors.password.message?.toString()}
						</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12} textAlign="end" marginBottom="2rem">
					<Link
						onClick={() => navigate("/forgot-password")}
						underline="hover"
						variant="caption"
					>
						Forgot your password?
					</Link>
				</Grid>
				<Grid item xs={12} marginBottom="0.5rem" textAlign="center">
					<Button
						disabled={isSubmitting || isRequestLoading}
						variant="contained"
						size="large"
						type="submit"
						endIcon={
							isSubmitting ||
							(isRequestLoading && (
								<>
									<CircularProgress size="1rem" color="inherit" />
								</>
							))
						}
					>
						{isSubmitting || isRequestLoading ? "Logging in..." : "Login"}
					</Button>
				</Grid>
				<Grid item xs={12} textAlign="center">
					<Typography variant="caption">Don't have an account yet? </Typography>
					<Link
						onClick={() => navigate("/register")}
						variant="caption"
						underline="hover"
					>
						Sign up!
					</Link>
				</Grid>
			</form>
		</>
	);
};

export default LoginForm;
