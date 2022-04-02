import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalQuantity: 0,
    showCart: false,
    changed: false,
    cartItems: [],
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.cartItems;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;

      // check if item exists in cart
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
