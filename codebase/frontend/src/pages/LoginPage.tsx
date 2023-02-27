import { Box, Grid, Paper, Typography } from "@mui/material";
import LoginForm from "./LoginPage/LoginForm";

type Props = {};

const LoginPage = (props: Props) => {
	return (
		<>
			<Box display="flex" justifyContent="center" alignItems="center">
				<Paper elevation={3}>
					<Box
						sx={{
							minWidth: "18rem",
							marginX: "4rem",
							marginY: "3rem",
						}}
					>
						<Grid container direction="column">
							<Grid item xs={12} textAlign="center" marginBottom="3rem">
								<Typography variant="h6">Login to your account</Typography>
							</Grid>
							<Grid item xs={12}>
								<LoginForm />
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</>
	);
};

export default LoginPage;
