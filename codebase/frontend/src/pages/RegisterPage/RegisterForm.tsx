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
	Divider,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { FieldValues, useForm, Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

type Props = {};

const registerSchema = yup.object({
	email: yup
		.string()
		.email("Invalid email")
		.required("Please enter your email"),
	mobile: yup.string().required("Please enter your mobile number"),
	firstName: yup.string().required("Please enter your first name"),
	lastName: yup.string().required("Please enter your last name"),
	password: yup.string().required("Please enter your password"),
	matchPassword: yup.string().required("Please re-enter your password"),
	dateOfBirth: yup.date().required("Please enter your date of birth"),
	hasSubscribed: yup.boolean().required(),
	hasReadTos: yup.boolean().isTrue().required(),
});

// TODO: Organize imports
// TODO: Validation for ToS checkbox

const RegisterForm = (props: Props) => {
	const navigate = useNavigate();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		control,
	} = useForm({ resolver: yupResolver(registerSchema) });
	const [isPasswordVisisble, setIsPasswordVisible] = useState<boolean>(false);
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => {
		console.log(data);
		setIsRequestLoading(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<TextField
							{...register("firstName")}
							label="First Name"
							variant="outlined"
							error={!!errors.firstName}
							disabled={isSubmitting || isRequestLoading}
							helperText={
								!!errors.firstName && errors.firstName.message?.toString()
							}
							fullWidth
						/>
						<TextField
							{...register("lastName")}
							label="Last Name"
							variant="outlined"
							error={!!errors.lastName}
							disabled={isSubmitting || isRequestLoading}
							helperText={
								!!errors.lastName && errors.lastName.message?.toString()
							}
							fullWidth
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<TextField
						{...register("email")}
						label="Email"
						variant="outlined"
						error={!!errors.email}
						disabled={isSubmitting || isRequestLoading}
						helperText={!!errors.email && errors.email.message?.toString()}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} textAlign="end" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<Controller
							name="dateOfBirth"
							control={control}
							render={({ field: { onChange, value, ref } }) => (
								<DatePicker
									onChange={onChange}
									ref={ref}
									value={value}
									renderInput={(params) => (
										<TextField
											error={!!errors.dateOfBirth}
											helperText={
												!!errors.dateOfBirth &&
												errors.dateOfBirth.message?.toString()
											}
											fullWidth
											{...params}
										/>
									)}
									label="Date of Birth"
								/>
							)}
						/>
						<TextField
							{...register("mobile")}
							label="Mobile"
							variant="outlined"
							error={!!errors.mobile}
							disabled={isSubmitting || isRequestLoading}
							helperText={!!errors.mobile && errors.mobile.message?.toString()}
							fullWidth
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="end" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
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
						<TextField
							{...register("matchPassword")}
							label="Match Password"
							variant="outlined"
							error={!!errors.matchPassword}
							disabled={isSubmitting || isRequestLoading}
							helperText={
								!!errors.matchPassword &&
								errors.matchPassword.message?.toString()
							}
							fullWidth
							type="password"
						/>
					</Stack>
				</Grid>
				<Divider />
				<Grid item xs={12} textAlign="center" marginY="1rem">
					<Stack direction={"column"} spacing={2}>
						<FormGroup>
							<FormControlLabel
								control={<Checkbox />}
								label={
									<>
										I have read and agreed to the{" "}
										<Link onClick={() => navigate("/terms-of-service")}>
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link onClick={() => navigate("/privacy-policy")}>
											Privacy Policy
										</Link>
									</>
								}
							/>
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label="I want to receive marketting emails, newsletters and updates about the platorm"
							/>
						</FormGroup>
					</Stack>
				</Grid>
				<Divider />
				<Grid
					item
					xs={12}
					marginBottom="0.5rem"
					marginTop="2rem"
					textAlign="center"
				>
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
						{isSubmitting || isRequestLoading ? "Registering..." : "Register"}
					</Button>
				</Grid>
				<Grid item xs={12} textAlign="center">
					<Typography variant="caption">Already have an account? </Typography>
					<Link
						variant="caption"
						underline="hover"
						onClick={() => navigate("/login")}
					>
						Login!
					</Link>
				</Grid>
			</form>
		</>
	);
};

export default RegisterForm;
