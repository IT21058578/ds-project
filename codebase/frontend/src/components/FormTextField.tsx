import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute, forwardRef } from "react";
import {
	ChangeHandler,
	FieldError,
	FieldErrorsImpl,
	Merge,
	RefCallBack,
} from "react-hook-form/dist/types";
import { camelToNormal } from "../utils/string-utils";

type Props = {
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	label?: string;
	isLoading: boolean;
	onChange: ChangeHandler;
	onBlur: ChangeHandler;
	name: string;
	multiline?: boolean;
	type?: HTMLInputTypeAttribute;
};

// TODO: Write comment

const FormTextField = forwardRef<HTMLDivElement, Props>(
	(
		{
			label,
			isLoading,
			error,
			name,
			onChange,
			onBlur,
			multiline = false,
			type = "text",
		}: Props,
		ref
	) => {
		return (
			<TextField
				multiline={multiline}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				ref={ref}
				name={name}
				fullWidth
				label={label || camelToNormal(name)}
				variant={"outlined"}
				error={!!error}
				disabled={isLoading}
				helperText={!!error && error.message?.toString()}
			/>
		);
	}
);

export default FormTextField;
