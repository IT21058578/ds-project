import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import BuyerLayout from "./BuyerLayout";
import SellerLayout from "./SellerLayout";
import UserLayout from "./UserLayout";

/**
 * Root layout resonsible for rendering all other layouts.
 */
const RootLayout = () => {
	const isSellerAdmin = true;

	/**
	 * Variable for defining all routing relevant to buyers and guests
	 */
	const buyerRouteConfiguration = (
		<Route path="/" element={<BuyerLayout />}>
			<Route path="/user" element={<UserLayout />}></Route>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/forgot-password" element={<ForgotPasswordPage />} />
			<Route path="/*" element={<ErrorPage />} />
		</Route>
	);

	/**
	 * Variable for defining all the routing relevant to admins and seller
	 */
	const sellerRouteConfiguration = (
		<Route path="/" element={<SellerLayout />}>
			<Route path="/*" element={<ErrorPage />} />
		</Route>
	);

	const router = createBrowserRouter(
		createRoutesFromElements(
			!isSellerAdmin ? buyerRouteConfiguration : sellerRouteConfiguration
		)
	);

	return <RouterProvider router={router} />;
};

export default RootLayout;
