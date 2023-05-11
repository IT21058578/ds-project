import { useTheme } from "@emotion/react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import FormTextField from "./FormTextField";
import SubmitButton from "./SubmitButton";
import {
	useCreateProductMutation,
	useEditProductMutation,
} from "../store/apis/products-api-slice";

type Props = {
	data?: {
		id?: string;
		name?: string;
		price?: string;
		imageUrl?: number;
		description?: string;
	};
	type: "ADD" | "EDIT";
	isOpen?: boolean;
	setIsOpen?: (arg0: boolean) => void;
};

const addEditProductSchema = yup.object({
	name: yup.string().required(),
	price: yup.number().required(),
	imageUrl: yup.string().url(),
	countInStock: yup.number().required(),
	description: yup.string(),
});

const AddEditProductModal = ({
	type,
	isOpen = false,
	setIsOpen = () => {},
	data,
}: Props) => {
	const theme = useTheme();
	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		setValue,
	} = useForm({ resolver: yupResolver(addEditProductSchema) });
	const [createProduct] = useCreateProductMutation();
	const [editProduct] = useEditProductMutation();
	const [serverErrorMessage, setServerErrorMessage] = useState<
		string | undefined
	>();

	useEffect(() => {
		if (data) {
			console.log(data);
			Object.entries(data).forEach(([key, value]) => {
				setValue(key, value);
			});
		}
	}, [data]);

	const onSubmit = async (formData: FieldValues) => {
		try {
			formData.imageUrl = [formData.imageUrl];
			if (type === "EDIT") {
				await editProduct({ ...formData, id: data?.id || "" });
			} else {
				await createProduct({ ...formData });
			}
			setIsOpen(false);
		} catch (error) {
			if ((error as any).status === 409) {
				setServerErrorMessage("This email is already in use");
			} else {
				setServerErrorMessage("An error occurred. Please try again later");
			}
		}
	};

	return (
		<Dialog open={isOpen}>
			<DialogTitle>
				{type === "EDIT" ? "Edit existing product" : "Create new product"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<div style={{ marginBottom: "16px" }}>
						{type === "EDIT"
							? "Please edit the product as required and confirm"
							: "Please enter all details for the product and confirm"}
					</div>
				</DialogContentText>
				<form id="bruh">
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							width: "100%",
						}}
					>
						<Stack direction="row" spacing={2}>
							<FormTextField
								error={errors.name}
								isLoading={false}
								{...register("name")}
							/>
							<FormTextField
								error={errors.price}
								isLoading={false}
								{...register("price")}
								type="number"
							/>
						</Stack>
						<Box>
							<FormTextField
								error={errors.imageUrl}
								isLoading={false}
								{...register("imageUrl")}
							/>
						</Box>
						<Box>
							<FormTextField
								type="number"
								error={errors.countInStock}
								isLoading={false}
								{...register("countInStock")}
							/>
						</Box>
						<Box>
							<FormTextField
								multiline
								error={errors.countInStock}
								isLoading={false}
								{...register("description")}
							/>
						</Box>
					</Box>
				</form>
			</DialogContent>
			<DialogActions sx={{ marginRight: "16px", marginBottom: "8px" }}>
				<Button variant="text" onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<SubmitButton
					onClick={handleSubmit(onSubmit)}
					isLoading={isSubmitting}
					normalText={type === "EDIT" ? "Edit" : "Create"}
					loadingText={type === "EDIT" ? "Editing..." : "Creating..."}
				/>
			</DialogActions>
		</Dialog>
	);
};

export default AddEditProductModal;
