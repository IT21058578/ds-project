import { FC, memo } from "react";
import { useAppDispatch } from "../../store/hooks";

import styles from "./CartItem.module.scss";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

import { addItem, minusItem, deleteItem } from "../../store/slices/cart-slice";
import placeholder from "../../assets/imgPlaceholder.jpeg";
import { Link } from "react-router-dom";
import { CartItem } from "../../types";


const CartItems: FC<CartItem> = memo(
  ({ image, productName, quantity, price, productID , productDescription, rating , review , countInStock , brand , categery}) => {
    const dispatch = useAppDispatch();
    
    const data = { image, productName, quantity, price, productID , productDescription, rating , review , countInStock , brand , categery };
    return (
      <div className={styles.cartItem}>
        <div className={styles.img}>
          <img src={image || placeholder} alt="ice-cream" />
        </div>
        <div className={styles.titles}>
          <Link to={`/ice-cream/${productID}`}>
            <div className={styles.title}>{productName}</div>
          </Link>
        </div>

        <div className={styles.count}>
          <button onClick={() => dispatch(minusItem(data))}>
            <RemoveCircleOutlineOutlinedIcon />
          </button>
          {quantity}
          <button onClick={() => dispatch(addItem(data))}>
            <ControlPointOutlinedIcon />
          </button>
        </div>
        <div className={styles.price}>{(quantity * price).toFixed(2)}$</div>
        <div className={styles.delete}>
          <button onClick={() => dispatch(deleteItem(data))}>
            <CloseOutlinedIcon />
          </button>
        </div>
      </div>
    );
  }
);

export default CartItems;