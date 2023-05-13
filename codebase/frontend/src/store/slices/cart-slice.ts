import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem,cartState } from "../../types";

const initialState: cartState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.productID === action.payload.productID
      );
      itemIndex >= 0
        ? (state.items[itemIndex].quantity += 1)
        : state.items.push({ ...action.payload });
      cartSlice.caseReducers.calculateCountAndPrice(state);
    },
    minusItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.productID === action.payload.productID
      );
      state.items[itemIndex].quantity > 1
        ? (state.items[itemIndex].quantity -= 1)
        : state.items.splice(itemIndex, 1);
      cartSlice.caseReducers.calculateCountAndPrice(state);
    },
    deleteItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productID === action.payload.productID
          )
      );
      cartSlice.caseReducers.calculateCountAndPrice(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
    calculateCountAndPrice: (state) => {
      state.totalCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
      state.totalPrice = +state.items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
});

export const { addItem, minusItem, deleteItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;