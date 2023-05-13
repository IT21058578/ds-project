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
          <img src={image[0] || placeholder} alt="Product Image" style={{maxWidth:'150px' , maxHeight:'150px' , borderRadius:'20%', padding:'20px'}}/>
        </div>
        <div className={styles.titles}>
          <Link to={`${productID}`}>
            <div className={styles.title}>{productName}</div>
          </Link>
        </div>

        <div className={styles.count}>
        <button onClick={() => dispatch(minusItem(data))}>
            <RemoveCircleOutlineOutlinedIcon color="success"/>
          </button>
          {quantity}
          <button onClick={() => dispatch(addItem(data))}>
            <ControlPointOutlinedIcon color="error"/>
          </button>
        </div>
        <div className={styles.price}>Rs. {(quantity * price).toFixed(2)}</div>
        <div className={styles.delete}>
          <button onClick={() => dispatch(deleteItem(data))}>
            <CloseOutlinedIcon color="error"/>
          </button>
        </div>
      </div>
    );
  }
);

export default CartItems;