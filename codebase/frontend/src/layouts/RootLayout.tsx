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
<<<<<<< HEAD
import Checkout from "../pages/OrderPage/Checkout"
import { useAppSelector } from "../store/hooks";
import BuyerLayout from "./BuyerLayout";
import ProductHome from "../pages/ProductPage/product"
import SellerLayout from "./SellerLayout";
import UserLayout from "./UserLayout";
import ProductView from "../pages/ProductPage/DetailViewer";
import Cart from "../pages/CartPage/CartView"
import AntDesignGrid from "../pages/OrderPage/OderDetail"
import ReviewTable from "../pages/ReviewPage/UserReviewDetails"
import ProfilePage from "../pages/ProfilePage/profile"


=======
import { useAppSelector } from "../store/hooks";
import BuyerLayout from "./BuyerLayout";
import SellerLayout from "./SellerLayout";
import UserLayout from "./UserLayout";
>>>>>>> origin/Dev

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
<<<<<<< HEAD
			<Route path="/cart" element={<Cart/>}/>
			<Route path="/placeOrder" element={<Checkout/>} />
			<Route path="/home" element={<ProductHome/>} />
			<Route path="/productdetails" element={<ProductView/>} />
			<Route path="/antdesigngrid" element={<AntDesignGrid/>} />
			<Route path="/reviewtable" element={<ReviewTable/>} />
			<Route path="/profilepage" element={<ProfilePage/>} />
=======
>>>>>>> origin/Dev
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
