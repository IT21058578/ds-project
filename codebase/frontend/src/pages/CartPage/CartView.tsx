import React, { FC } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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



const Cart: FC = () => {

  const items = [
    {
      image: ["https://www.sjp.ac.lk/wp-content/uploads/2016/06/Herbal-Products.jpg"],
      productName: "Product 1",
      quantity: 7,
      price: 9.99,
      productID: "1",
      productDescription: "This is a description of product 1.",
      review: "good",
      countInStock: 10,
      categery: "Category 1",
      brand: "Brand 1",
      rating: 4.5,
    },
    {
      image: ["https://media.istockphoto.com/id/1192284372/photo/composition-of-natural-alternative-medicine-with-capsules-essence-and-plants.jpg?s=612x612&w=0&k=20&c=AOZISN4jnN4hGm59us3hyR0BMymkyxkzTPM8CxsBWZI="],
      productName: "Product 2",
      quantity: 2,
      price: 19.98,
      productID: "2",
      productDescription: "This is a description of product 2.",
      review: "good",
      countInStock: 5,
      categery: "Category 2",
      brand: "Brand 2",
      rating: 4.0,
    },
  ];
  // const { items } = useAppSelector((state) => state.cart);
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (

    <Box sx={{marginTop:'55px'}}>
    <div className={styles.cart}>
      <div className={styles.top}>
        <div className={styles.title}>
          <ShoppingCartOutlinedIcon />
          Cart
        </div>
        {totalCount !== 0 && (
          <div className={styles.clear}>
            <button onClick={() => dispatch(clearCart())}>
              <DeleteOutlineOutlinedIcon color="error"/>
              Clear Cart
            </button>
          </div>
        )}
      </div>
      {items.length ? (
        items.map((item) => (
          <CartItem
            image={item.image}
            productName={item.productName}
            quantity={item.quantity}
            price={item.price}
            key={+("" + item.productID)}
            productID={item.productID}
            productDescription = {item.productDescription}
            review = {item.review}
            countInStock = {item.countInStock}
            categery = {item.categery}
            brand = {item.brand}
            rating = {item.rating}
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
        {totalCount !== 0 && <button
         onClick={() => navigate("/placeOrder")}
         className={styles.buy}>Check Out</button>}
      </div>
    </div>
    </Box>
  );
};

export default Cart;  