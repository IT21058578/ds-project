import React, { FC } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";

import styles from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/slices/cart-slice";
import placeholder from "../../assets/emptyCart.svg";
import CartItem from "../../components/CartItem/CartItem";
import NoResultsImg from "../../components/NoResultsImg/NoResultsImg";


const Cart: FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { totalPrice, totalCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.cart}>
      <div className={styles.top}>
        <div className={styles.title}>
          <ShoppingCartOutlinedIcon />
          Cart
        </div>
        {totalCount !== 0 && (
          <div className={styles.clear}>
            <button onClick={() => dispatch(clearCart())}>
              <DeleteOutlineOutlinedIcon />
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
        Total: {totalPrice}$ ({totalCount})
      </div>
      <div className={styles.bottom}>
        <Link to={"/home"} className={styles.back}>
          Back
        </Link>
        {totalCount !== 0 && <button className={styles.buy}>Buy</button>}
      </div>
    </div>
  );
};

export default Cart;  