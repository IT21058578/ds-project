import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

type Props = {};

const ErrorPage = (props: Props) => {
	return (
		<Paper elevation={3}>
			<Box
				sx={{
					minWidth: "18rem",
					paddingX: "4rem",
					paddingY: "3rem",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				<Typography variant="h3" marginBottom="1rem">
					Oops!
				</Typography>
				<Typography variant="h6" marginBottom="1rem">
					We couldn't find this page
				</Typography>
				<Button size="large" variant="contained">
					Back to Home
				</Button>
			</Box>
		</Paper>
	);
};

export default ErrorPage;
