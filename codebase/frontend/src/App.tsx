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
