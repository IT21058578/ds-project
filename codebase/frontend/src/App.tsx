import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/LoginPage";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import "./global.css";
import RegisterPage from "./pages/RegisterPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import BuyerLayout from "./layouts/BuyerLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

type Props = {};

// TODO: Routing

const App = (props: Props) => {
	const customTheme = createTheme({
		palette: {
			mode: "light",
			primary: {
				main: "#84d044",
			},
			secondary: {
				main: "#4483d0",
			},
		},
		typography: {
			fontFamily: ["Quicksand", "sans-serif"].join(","),
			button: { textTransform: "none" },
			body1: { fontSize: "0.9rem" },
		},
	});

	const browserRouter = createBrowserRouter([
		{
			path: "/",
			element: <BuyerLayout />,
			errorElement: <ErrorPage />,
			children: [
				{ path: "login", element: <LoginPage /> },
				{ path: "register", element: <RegisterPage /> },
				{ path: "forgot-password", element: <ForgotPasswordPage /> },
				{ path: "reset-password", element: <ResetPasswordPage /> },
			],
		},
	]);

	return (
		<ThemeProvider theme={customTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<RouterProvider router={browserRouter} />
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default App;
