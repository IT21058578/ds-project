import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import { LocalizationProvider } from "@mui/x-date-pickers";

import RootLayout from "./layouts/RootLayout";
import { store } from "./store/store";

import "./global.css";

const App = () => {
	const customTheme = createTheme({
		palette: {
			mode: "light",
			primary: {
				main: "#84d044",
				"100": "#dbf1c8",
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

	return (
		<ThemeProvider theme={customTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Provider store={store}>
					<RootLayout />
				</Provider>
			</LocalizationProvider>
		</ThemeProvider>
	);
};

export default App;
