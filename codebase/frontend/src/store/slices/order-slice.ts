import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder, IOrderState } from "../../types";

const initialState: IOrderState = {
    order : [],
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		getAllOrders: (
			order,
			{
				payload,
			}: PayloadAction<{
				order:IOrder[];
			}>
		) => {
			order.order = payload.order;
		},
        addOrder: (
            state,
            { payload }: PayloadAction<IOrder>
          ) => {
            state.order!.push(payload);
          },
        selectOrder: (state, { payload }: PayloadAction<IOrder>) => {
            state.selectedOrder = payload;
        },

	},
});

// Exporting action creators
export const { getAllOrders , addOrder , selectOrder } = orderSlice.actions;

//Exporting reducer
export const orderReducer = orderSlice.reducer;
