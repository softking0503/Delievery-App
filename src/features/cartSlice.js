import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
    discountedPrice: 0,
    CartToast: true, // Initially, the cart toast is visible
  },
  reducers: {
    addProduct: (state, action) => {
      const { product } = action.payload;

      const existingProductIndex = state.products.findIndex(
        (p) => p._id === product._id
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }
      if (product.discountPercent > 0) {
        state.totalQuantity += 1;
        state.discountedPrice = Math.round(
          product.price * (1 - product.discountPercent / 100)
        );
        state.totalPrice += state.discountedPrice * 1;
      } else {
        state.totalQuantity += 1;
        state.totalPrice += product.price * 1;
      }
    },
    removeProduct: (state, action) => {
      const { product } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p._id === product._id
      );
      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products.splice(existingProductIndex, 1);
        }
        state.totalQuantity = state.products.reduce(
          (total, p) => total + p.quantity,
          0
        );
        state.totalPrice = state.products.reduce(
          (total, p) =>
            total +
            (p.discountPercent > 0
              ? Math.round(p.price * (1 - p.discountPercent / 100)) *
                p.quantity
              : p.price * p.quantity),
          0
        );
      } else {
        console.log("Product not found in cart");
      }
    },
    // Reducer to update CartToast value
    updateCartToast: (state, action) => {
      state.CartToast = action.payload; // Set CartToast to true or false
    },
  },
});

export const { addProduct, removeProduct, updateCartToast } = cartSlice.actions;

export default cartSlice.reducer;
