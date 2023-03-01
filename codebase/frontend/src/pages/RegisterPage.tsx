import { Box, Grid, Paper, Typography } from "@mui/material";
import RegisterForm from "./RegisterPage/RegisterForm";

type Props = {};

const RegisterPage = (props: Props) => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Paper elevation={3}>
				<Box
					sx={{
						minWidth: "26rem",
						marginX: "4rem",
						marginY: "3rem",
					}}
				>
					<Grid container direction="column">
						<Grid item xs={12} textAlign="center" marginBottom="3rem">
							<Typography variant="h6">Create a new account</Typography>
						</Grid>
						<Grid item xs={12}>
							<RegisterForm />
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default RegisterPage;
