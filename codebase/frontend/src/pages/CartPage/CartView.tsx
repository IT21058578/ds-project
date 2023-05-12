import React, { FC, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/slices/cart-slice";
import placeholder from "../../assets/emptyCart.svg";
import CartItem from "../../components/CartItem/CartItem";
import NoResultsImg from "../../components/NoResultsImg/NoResultsImg";
import CartItems from "../../components/CartItem/CartItem";
import { Box } from "@mui/material";
import { useLazyGetCartQuery } from "../../store/apis/cart-api-slice";

const Cart: FC = () => {
	// const items = [
	//   {
	//     imageU: ["https://cdn.shopify.com/s/files/1/0036/5245/2397/products/fenugreekoil_740x.png?v=1676350286"],
	//     productName: "Fenugeek Oil",
	//     quantity: 1,
	//     price: 500.00,
	//     productID: "1",
	//     productDescription: "This is a description of product 1.",
	//     review: "good",
	//     countInStock: 10,
	//     categery: "Oils",
	//     brand: "Brand 1",
	//     rating: 4.5,
	//   },
	//   {
	//     image: ["https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"],
	//     productName: "Liya Face",
	//     quantity: 1,
	//     price: 400.00,
	//     productID: "2",
	//     productDescription: "This is a description of product 2.",
	//     review: "good",
	//     countInStock: 5,
	//     categery: "Creams",
	//     brand: "Brand 2",
	//     rating: 4.0,
	//   },
	// ];
	// const { items } = useAppSelector((state) => state.cart);
	const user = useAppSelector((state) => state.auth.user);
	const { totalPrice, totalCount } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [getCart, { data: rawCartData }] = useLazyGetCartQuery();

	useEffect(() => {
		getCart({ userId: user?.id ?? "" });
	});

	return (
		<Box sx={{ marginTop: "55px" }}>
			<div className={styles.cart}>
				<div className={styles.top}>
					<div className={styles.title}>
						<ShoppingCartOutlinedIcon />
						Cart
					</div>
					{totalCount !== 0 && (
						<div className={styles.clear}>
							<button onClick={() => dispatch(clearCart())}>
								<DeleteOutlineOutlinedIcon color="error" />
								Clear Cart
							</button>
						</div>
					)}
				</div>
				{rawCartData?.items !== undefined ? (
					rawCartData.items.map((item: any) => (
						<CartItem
							imageUrl={item.imageUrl}
							name={item.name}
							quantity={item.quantity}
							price={item.price}
							key={item.id}
							id={item.id}
							description={item.description}
							countInStock={item.countInStock}
							category={item.category}
							brandId={item.brandId}
							createdOn={new Date()} // Add the createdOn property here with a suitable value
							lastEditedOn={new Date()}
						/>
					))
				) : (
					<NoResultsImg imgUrl={placeholder} title={"Your Cart is empty!"} />
				)}
				<div className={styles.total}>
					Total: Rs. {totalPrice} ({totalCount})
				</div>
				<div className={styles.bottom}>
					<Link to={"/"} className={styles.back}>
						Back
					</Link>
					{totalCount !== 0 && (
						<button
							onClick={() => navigate("/placeOrder")}
							className={styles.buy}
						>
							Check Out
						</button>
					)}
				</div>
			</div>
		</Box>
	);
};

export default Cart;
