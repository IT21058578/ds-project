import * as jose from "jose";
import { Grid, Link, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../../components/SubmitButton";
import FormTextField from "../../components/FormTextField";
import PasswordFormTextField from "../../components/PasswordFormTextField";
import { useUserLoginMutation } from "../../store/apis/auth-api-slice";

import { ILoginRequest, ILoginResponse, IUser } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import { useLazyGetUserQuery } from "../../store/apis/user-api-slice";
import { useEffect, useState } from "react";
import { publicAccessTokenKey } from "../../constants/auth-constants";
import { setAuth } from "../../store/slices/auth-slice";

type Props = {};

const loginSchema = yup.object({
	email: yup
		.string()
<<<<<<< HEAD
		.email("Invalid email")
=======
		.email("Invalid email")  
>>>>>>> origin/DevDisira
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
	const [loginUser, { isLoading: isLoginLoading }] = useUserLoginMutation();
	const [getUser, { isLoading: isUserLoading }] = useLazyGetUserQuery();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isSubmitting || isLoginLoading || isUserLoading) setIsLoading(true);
		else setIsLoading(false);
	}, [isSubmitting, isLoginLoading, isUserLoading]);

	/**
	 * This method does a few things and places our user in the redux state.
	 * 1. Makes a request to get tokens
	 * 2. Decrcypts tokens to get id
	 * 3. Makes a request to get user data from id
	 * 4. Transform user object to desired form
	 * 5. Makes a dispatch containing all the data to set auth
	 * 6. Navigate to the root
	 * @param {FieldValues} data - An object containing an email and a password
	 */
	const onSubmit = async (data: FieldValues) => {
		const { email, password } = data as ILoginRequest;
		try {
			const { accessToken, refreshToken }: ILoginResponse = await loginUser({
				email,
				password,
			}).unwrap();

			const secret = await jose.importSPKI(publicAccessTokenKey, "RS256");
			const {
				payload: { id },
			} = (await jose.jwtVerify(accessToken, secret)) as {} as {
				payload: { id: string };
			};

			const { data } = await getUser(id as string);
			if (!data) throw Error("This should not happen");

			const user: IUser = {
				id,
				email: data.email,
				firstName: data.firstName,
				isAuthorized: data.isAuthorized,
				isSubscribed: data.isSubscribed,
				lastName: data.lastName,
				mobile: data.mobile,
				roles: data.roles,
			};
			dispatch(setAuth({ user, accessToken, refreshToken }));
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid item xs={12} textAlign="center" marginBottom="1rem">
					<FormTextField
						{...register("email")}
						error={errors.email}
						isLoading={isLoading}
					/>
				</Grid>
				<Grid item xs={12} textAlign="center" marginBottom="0.25rem">
					<PasswordFormTextField
						{...register("password")}
						error={errors.password}
						isLoading={isLoading}
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
						isLoading={isLoading}
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
