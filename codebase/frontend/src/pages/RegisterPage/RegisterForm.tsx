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
import SubmitButton from "../../components/SubmitButton";
import FormTextField from "../../components/FormTextField";
import {
	RegisterOptions,
	UseFormRegisterReturn,
} from "react-hook-form/dist/types";
import PasswordFormTextField from "../../components/PasswordFormTextField";

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
	hasReadTos: yup
		.boolean()
		.default(false)
		.isTrue("Please read the privacy policy and Terms of Service to register")
		.required(),
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
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => {
		console.log(data);
		setIsRequestLoading(true);
	};

	const onSubmitError = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<FormTextField
							error={errors.firstName}
							isLoading={isSubmitting || isRequestLoading}
							{...register("firstName")}
						/>
						<FormTextField
							error={errors.lastName}
							isLoading={isSubmitting || isRequestLoading}
							{...register("lastName")}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<FormTextField
						error={errors.email}
						isLoading={isSubmitting || isRequestLoading}
						{...register("email")}
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
									label="Date of Birth"
									renderInput={(params) => (
										<TextField
											color="error"
											error={!!errors.dateOfBirth}
											helperText={
												!!errors.dateOfBirth &&
												errors.dateOfBirth.message?.toString()
											}
											fullWidth
											{...params}
										/>
									)}
								/>
							)}
						/>
						<FormTextField
							error={errors.mobile}
							isLoading={isSubmitting || isRequestLoading}
							{...register("mobile")}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="end" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<PasswordFormTextField
							error={errors.password}
							isLoading={isSubmitting || isRequestLoading}
							{...register("password")}
						/>
						<FormTextField
							error={errors.matchPassword}
							isLoading={isSubmitting || isRequestLoading}
							{...register("matchPassword")}
						/>
					</Stack>
				</Grid>
				<Divider />
				<Grid item xs={12} textAlign="center" marginY="1rem">
					<Stack direction={"column"}>
						<FormControl margin="dense" error={!!errors.hasReadTos}>
							<FormGroup>
								<FormControlLabel
									{...register("hasReadTos")}
									control={
										<Checkbox
											color={!!errors.hasReadTos ? "error" : "primary"}
										/>
									}
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
							</FormGroup>
							<FormHelperText>
								{!!errors.hasReadTos && errors.hasReadTos.message?.toString()}
							</FormHelperText>
						</FormControl>
						<FormControl>
							<FormGroup>
								<FormControlLabel
									{...register("hasSubscribed")}
									control={<Checkbox defaultChecked />}
									label="I want to receive marketting emails, newsletters and updates about the platorm"
								/>
							</FormGroup>
						</FormControl>
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
					<SubmitButton
						isLoading={isSubmitting || isRequestLoading}
						normalText={"Register"}
						loadingText={"Registering..."}
					/>
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
