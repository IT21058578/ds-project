import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import {
	ChangeHandler,
	FieldError,
	FieldErrorsImpl,
	Merge,
} from "react-hook-form";

type Props = {
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	label?: string;
	isLoading: boolean;
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
};

// TODO: Write Documentation

const PasswordFormTextField = forwardRef<HTMLDivElement, Props>(
	({ error, isLoading, label, onChange, onBlur, name }: Props, ref) => {
		const [isVisisble, setIsVisible] = useState<boolean>(false);

		return (
			<FormControl error={!!error} fullWidth variant="outlined">
				<InputLabel>Password</InputLabel>
				<OutlinedInput
					ref={ref}
					name={name}
					type={isVisisble ? "text" : "password"}
					disabled={isLoading}
					onChange={onChange}
					onBlur={onBlur}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								color={!!error ? "error" : "default"}
								aria-label="toggle password visibility"
								edge="end"
								onClick={() => setIsVisible((prev) => !prev)}
								disabled={isLoading}
							>
								{isVisisble ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label={label || "Password"}
				/>
				<FormHelperText error>
					{!!error && error.message?.toString()}
				</FormHelperText>
			</FormControl>
		);
	}
);

export default PasswordFormTextField;
