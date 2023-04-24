import { Button, CircularProgress } from "@mui/material";

type Props = {
	isLoading: boolean;
	loadingText: string;
	normalText: string;
	onClick?: () => {};
	formId?: string;
};

const SubmitButton = ({
	isLoading,
	normalText,
	loadingText,
	onClick,
}: Props) => {
	return (
		<Button
			disabled={isLoading}
			variant="contained"
			size="large"
			type={onClick ? "button" : "submit"}
			onClick={onClick}
			endIcon={
				isLoading && (
					<>
						<CircularProgress size="1rem" color="inherit" />
					</>
				)
			}
		>
			{isLoading ? loadingText : normalText}
		</Button>
	);
};

export default SubmitButton;
