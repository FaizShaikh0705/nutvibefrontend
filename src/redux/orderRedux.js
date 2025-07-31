import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        currentOrder: null,
        isPlacingOrder: false,
        placeOrderError: null,
    },
    reducers: {
        resetPlaceOrderError: (state) => {
            state.placeOrderError = null;
        },
        placeOrderStart: (state) => {
            state.isPlacingOrder = true;
            state.placeOrderError = null;
        },
        placeOrderSuccess: (state, action) => {
            state.isPlacingOrder = false;
            state.currentOrder = action.payload;
        },
        placeOrderFailure: (state, action) => {
            state.isPlacingOrder = false;
            state.placeOrderError = action.payload;
        },
        resetPlaceOrderError: (state) => {
            state.placeOrderError = null;
        },
        setShipAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        resetOrder: (state) => {
            state.currentOrder = null;
            state.isPlacingOrder = false;
            state.placeOrderError = null;
            state.shippingAddress = null;
        },
    },
});

export const {
    placeOrderStart,
    placeOrderSuccess,
    placeOrderFailure,
    resetPlaceOrderError,
    setShipAddress,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
