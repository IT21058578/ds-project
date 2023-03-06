import { useEffect, useState } from "react";

import {
	FormControl,
	Grid,
	Link,
	TextField,
	Typography,
	Divider,
	FormGroup,
	FormControlLabel,
	Checkbox,
	useTheme,
} from "@mui/material";
import { FieldValues, useForm, Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../../components/SubmitButton";
import FormTextField from "../../components/FormTextField";
import PasswordFormTextField from "../../components/PasswordFormTextField";
import { useUserRegisterMutation } from "../../store/apis/auth-api-slice";

import { IRegisterRequest } from "../../types";

type Props = { setIsRegisterSuccessful: (arg0: boolean) => void };

// TODO: Validation for ToS checkbox
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

const RegisterForm = ({ setIsRegisterSuccessful }: Props) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		control,
	} = useForm({ resolver: yupResolver(registerSchema) });
	const [serverErrorMessage, setServerErrorMessage] = useState<
		string | undefined
	>();
	const [registerUser, { isLoading, isSuccess, isError, reset }] =
		useUserRegisterMutation();

	const onSubmit = async (formData: FieldValues) => {
		try {
			const response = await registerUser({
				...(formData as IRegisterRequest),
			}).unwrap();
		} catch (error) {
			if ((error as any).status === 409) {
				setServerErrorMessage("This email is already in use");
			} else {
				setServerErrorMessage("An error occurred. Please try again later");
			}
		}
		reset();
	};

	useEffect(() => {
		if (isSuccess) {
			setIsRegisterSuccessful(true);
		} else if (isError) {
			setIsRegisterSuccessful(false);
		}
		reset();
	}, [isSuccess, isError]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<FormTextField
							error={errors.firstName}
							isLoading={isSubmitting || isLoading}
							{...register("firstName")}
						/>
						<FormTextField
							error={errors.lastName}
							isLoading={isSubmitting || isLoading}
							{...register("lastName")}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<FormTextField
						error={errors.email}
						isLoading={isSubmitting || isLoading}
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
							isLoading={isSubmitting || isLoading}
							{...register("mobile")}
						/>
					</Stack>
				</Grid>
				<Grid item xs={12} textAlign="end" marginBottom="1rem">
					<Stack direction={"row"} spacing={2}>
						<PasswordFormTextField
							error={errors.password}
							isLoading={isSubmitting || isLoading}
							{...register("password")}
						/>
						<FormTextField
							error={errors.matchPassword}
							isLoading={isSubmitting || isLoading}
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
				<Grid item xs={12} marginBottom="0.5rem" marginTop="1rem">
					<Typography
						color={theme.palette.error.light}
						sx={{ textAlign: "center" }}
					>
						{serverErrorMessage}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					marginBottom="0.5rem"
					marginTop="1rem"
					textAlign="center"
				>
					<SubmitButton
						isLoading={isSubmitting || isLoading}
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
