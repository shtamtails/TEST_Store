import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartItems } from "interface/ICart";

const initialState = {
  cart: [],
  total: 0,
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: ICart, action: PayloadAction<ICartItems>) => {
      state.cart.push(action.payload);
    },
    removeItemFromCart: (state: ICart, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseAmount: (state: ICart, action: PayloadAction<string>) => {
      state.cart.map((item) => item.orderId === action.payload && (item.amount = item.amount + 1));
    },
    decreaseAmount: (state: ICart, action: PayloadAction<string>) => {
      state.cart.map((item) => item.orderId === action.payload && (item.amount = item.amount - 1));
    },
    addTotal: (state: ICart, action: PayloadAction<number>) => {
      state.total += action.payload;
    },
    resetTotal: (state: ICart) => {
      state.total = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, increaseAmount, decreaseAmount, addTotal, resetTotal } = cart.actions;
