import { Button, CircularProgress } from "@mui/material";
import React from "react";

type Props = {
	isLoading: boolean;
	loadingText: string;
	normalText: string;
};

const SubmitButton = ({ isLoading, normalText, loadingText }: Props) => {
	return (
		<Button
			disabled={isLoading}
			variant="contained"
			size="large"
			type="submit"
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
