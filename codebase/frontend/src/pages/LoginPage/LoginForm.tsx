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
import SubmitButton from "../../components/SubmitButton";
import FormTextField from "../../components/FormTextField";
import PasswordFormTextField from "../../components/PasswordFormTextField";

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
	const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => {
		setIsRequestLoading(true);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<FormTextField
						{...register("email")}
						error={errors.email}
						isLoading={isSubmitting || isRequestLoading}
					/>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="0.25rem">
					<PasswordFormTextField
						{...register("password")}
						error={errors.password}
						isLoading={isSubmitting || isRequestLoading}
					/>
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
					<SubmitButton
						isLoading={isSubmitting || isRequestLoading}
						normalText={"Login"}
						loadingText={"Logging in..."}
					/>
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
