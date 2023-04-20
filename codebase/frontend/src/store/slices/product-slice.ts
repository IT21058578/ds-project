import { IntegrationInstructionsSharp } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Iproduct , productState} from '../../types';

const initialState: productState = {};

const productSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {
        diplayProducts: (
            products,
            {
                payload,
            }: PayloadAction<{
                 products:Iproduct[];
            }>
        ) => {
              products.products = payload.products;
        },
        displayProduct:(product,
            {
                payload,
            }: PayloadAction<{
                 product:Iproduct;
            }>
        ) =>{ 
            product.products?.findIndex(product => product.productID === payload.product.productID);
        },
    },
 });

 // Exporting action creators
export const { diplayProducts , displayProduct} = productSlice.actions;

//Exporting reducer
export const productReducer = productSlice.reducer;
