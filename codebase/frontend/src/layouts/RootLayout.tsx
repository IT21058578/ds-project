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
import Checkout from "../pages/OrderPage/Checkout"
import { useAppSelector } from "../store/hooks";
import BuyerLayout from "./BuyerLayout";
import ProductHome from "../pages/ProductPage/product"
import SellerLayout from "./SellerLayout";
import UserLayout from "./UserLayout";
import ProductView from "../pages/ProductPage/DetailViewer";
import Cart from "../pages/CartPage/CartView"
import Order from "../pages/OrderPage/OderDetail"
import ReviewTable from "../pages/ReviewPage/UserReviewDetails"
import ProfilePage from "../pages/ProfilePage/profile"


import OrdersListPage from "../pages/OrdersListPage";
import ReviewsListPage from "../pages/ReviewsListPage";
import CustomersListPage from "../pages/CustomersListPage";
import SellersListPage from "../pages/SellersListPage";
import ProductsListPage from "../pages/ProductsListPage";
import AdminCustomerPage from "../pages/AdminCustomerPage";
import AdminReviewPage from "../pages/AdminReviewPage";


/**
 * Root layout responsible for rendering all other layouts.
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
    // FIXME: Changed for testing
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
			<Route path="/cart" element={<Cart/>}/>
			<Route path="/placeOrder" element={<Checkout/>} />
			<Route path="/" element={<ProductHome/>} />
			<Route path="/productdetails" element={<ProductView/>} />
			<Route path="/order" element={<Order/>} />
			<Route path="/reviewtable" element={<ReviewTable/>} />
			<Route path="/profilepage" element={<ProfilePage/>} />
      <Route path="/*" element={<ErrorPage />} />
    </Route>
  );

  /**
   * Variable for defining all the routing relevant to admins and seller
   */
  const sellerRouteConfiguration = (
    <Route path="/" element={<SellerLayout />}>
      <Route path="/orders" element={<OrdersListPage />} />
      <Route path="/reviews" element={<ReviewsListPage />} />
      <Route path="/reviews/:reviewId" element={<AdminReviewPage />} />
      <Route path="/customers" element={<CustomersListPage />} />
      <Route path="/customers/:customerId" element={<AdminCustomerPage />} />
      <Route path="/sellers" element={<SellersListPage />} />
      <Route path="/products" element={<ProductsListPage />} />
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