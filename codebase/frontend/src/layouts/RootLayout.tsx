import { useEffect, useState } from "react";
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
import { useAppSelector } from "../store/hooks";
import BuyerLayout from "./BuyerLayout";
import SellerLayout from "./SellerLayout";
import UserLayout from "./UserLayout";

/**
 * Root layout resonsible for rendering all other layouts.
 */
const RootLayout = () => {
	const user = useAppSelector((state) => state.auth.user);
	const [isUserSellerAdmin, setIsUserSellerAdmin] = useState<boolean>();

	useEffect(() => {
		if (!!user) {
			if (user.roles.some((role) => ["SELLER", "ADMIN"].includes(role))) {
				return setIsUserSellerAdmin(true);
			}
		}
		return setIsUserSellerAdmin(false);
	}, [user]);

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
			!isUserSellerAdmin ? buyerRouteConfiguration : sellerRouteConfiguration
		)
	);

	return <RouterProvider router={router} />;
};

export default RootLayout;
